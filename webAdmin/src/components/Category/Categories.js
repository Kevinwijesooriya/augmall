import React, { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosService';
import axios from 'axios';
import { Form, Button, Alert, Container, Row, Col, Card , Table, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [newCategory, setNewCategory] = useState({
        name: '',
        description: '',
        parent_id:0,
        image: null,
    });

    const [updateCategory, setUpdateCategory] = useState({
        name: '',
        description: '',
        parent_id:0,
        image: null,
    });

    const openModal = (category) => {
        setCurrentCategory(category);
        setShowModal(true);
    };

    const closeModal = () => {
        setCurrentCategory(null);
        setShowModal(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentCategory({ ...currentCategory, [name]: value });
    };

    const handleImageChange = (event) => {
        setCurrentCategory({ ...currentCategory, image: event.target.files[0] });
    };

    const handleSubmit =  async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', currentCategory.name);
        if(currentCategory.description){
            formData.append('description', currentCategory.description);
        }
        if(currentCategory.parent_id){
            formData.append('parent_id', currentCategory.parent_id);
        }
        if (currentCategory.image) {
            formData.append('image', currentCategory.image);
        }
        // ... append other fields ...

        const url = currentCategory._id ? `/categories/update/${currentCategory._id}` : '/categories/create';
        const method = currentCategory._id ? 'put' : 'post';
        try {
            const response = method === 'put' 
            ? await axiosInstance.put(url, formData) 
            : await axiosInstance.post(url, formData);

            const updatedCategory = categories.map(category => 
                category._id === currentCategory._id ? response.data : category
            );
            setCategories(updatedCategory);
        }catch (error) {
            alert("Error saving category : "+error.message);
            console.error("Error saving category:", error);
        }
        closeModal();
        
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
                    axiosInstance.delete(`/categories/delete/${id}`)
                    .then(() => {
                        setCategories(categories.filter((categories) => categories._id !== id));
                    })
                    .catch((error) => {
                        console.error("Error deleting category: ", error);
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
        axiosInstance.get('/categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);;

    return (
        <>
            <div>
                <h1>Category Management</h1>
                <div className='row justify-content-end'>
                    <div className='col-12 col-md-3'>
                        <Button variant='success' onClick={() => openModal({})} className='mb-4'>Add Category</Button>
                    </div>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category._id}>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>
                                    {category.parent_id !=0 ?? 
                                        <Button variant="info" onClick={() => openModal(category)}>View child categories</Button>
                                    }
                                    <Button variant="warning" className='m-1' onClick={() => openModal(category)}>Edit</Button>
                                    <Button variant="danger" onClick={() => handleDelete(category._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal show={showModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{currentCategory && currentCategory._id ? 'Edit Category' : 'Add Category'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={currentCategory ? currentCategory.name : ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={currentCategory ? currentCategory.description : ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
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
        </>
    )
}

export default Categories;