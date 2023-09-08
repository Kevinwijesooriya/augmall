import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axiosInstance from '../../services/axiosService';
import Swal from 'sweetalert2';


const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);

    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: 0,
        image: null,
        // ... other fields ...
    });

    const [updateProduct, setUpdateProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: 0,
        image: null,
        // ... other fields ...
    });

    const openModal = (product) => {
        setCurrentProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setCurrentProduct(null);
        setShowModal(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const handleImageChange = (event) => {
        setCurrentProduct({ ...currentProduct, image: event.target.files[0] });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', currentProduct.name);

        if(currentProduct.description){
            formData.append('description', currentProduct.description);
        }
        if(currentProduct.sku){
            formData.append('sku',currentProduct.sku);
        }
        if(currentProduct.status){
            formData.append('status',currentProduct.status);
        }
        if(currentProduct.category){
            formData.append('category',currentProduct.category);
        }
        formData.append('price', currentProduct.price);
        if (currentProduct.image) {
            formData.append('image', currentProduct.image);
        }

        const url = currentProduct._id ? `/products/update/${currentProduct._id}` : '/products/create';
        const method = currentProduct._id ? 'put' : 'post';

        axiosInstance({
            method: method,
            url: url,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                if (currentProduct._id) {
                    // Update the product in the current list of products
                    setProducts(products.map((product) =>
                        product._id === response.data._id ? response.data : product
                    ));
                } else {
                    // Add the new product to the current list of products
                    setProducts([...products, response.data]);
                }
                closeModal();
            })
            .catch((error) => {
                console.error("Error saving product: ", error);
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    axiosInstance.delete(`/products/delete/${id}`)
                    .then(() => {
                        setProducts(products.filter((product) => product._id !== id));
                    })
                    .catch((error) => {
                        console.error("Error deleting product: ", error);
                    });
                    Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
                    // Handle successful deletion, e.g., remove item from state or refetch data
                } catch (error) {
                    console.error("Error deleting item:", error);
                    Swal.fire('Error!', 'There was an error deleting the item.', 'error');
                }
            }
        });

       
    };


    useEffect(() => {
        // Fetch all products when the component mounts
        axiosInstance.get('/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, [])


    // ... other code to handle create, update, delete operations ...

    return (
        <div>
            <h1>Product Management</h1>
            <div className='row justify-content-end'>
                <div className='col-12 col-md-3'>
                <Button variant='success' onClick={() => openModal({})} className='mb-4'>Add Product</Button>
                </div>
            </div>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>S.K.U</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price} LKR</td>
                            <td>{product.sku} Items</td>
                            <td>
                                <Button variant="warning" onClick={() => openModal(product)} className='m-1'>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(product._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentProduct && currentProduct._id ? 'Edit Product' : 'Add Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* ... input fields for creating/updating a product ... */}
                        <Form.Group className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={currentProduct ? currentProduct.name : ''}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={currentProduct ? currentProduct.description : ''}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Price (LKR)</Form.Label>
                            <Form.Control
                                type="text"
                                name="price"
                                value={currentProduct ? currentProduct.price : ''}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>S.K.U</Form.Label>
                            <Form.Control
                                type="number"
                                name="sku"
                                value={currentProduct ? currentProduct.sku : ''}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>SKU Status</Form.Label>
                            <Form.Control as="select" name="status" onChange={handleInputChange} value={currentProduct ? currentProduct.status : ''}>
                                <option value="">--Select SKU Status--</option>
                                <option value="available">In Stock</option>
                                <option value="out_of_stock">Out Of Stock</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Select Category</Form.Label>
                            <Form.Control as="select" name="category" value={currentProduct ? currentProduct.category : ''} onChange={handleInputChange}>
                                <option value="">--Select Category--</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Form.Group>
                        <Button type="submit">Save</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ProductManagement;
