import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for API calls
import { Modal, Button, Form } from 'react-bootstrap';
import { FaBox } from 'react-icons/fa';
import axiosInstance from './axiosService';
import Swal from 'sweetalert2';

function ProductModal({ products, onAdd, show, handleClose }) {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleAddClick = () => {
        if (selectedProduct) {
            onAdd(selectedProduct);
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Product to Map</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Select Product</Form.Label>
                    <Form.Control as="select" onChange={(e) => setSelectedProduct(e.target.value)}>
                        <option value="">--Select Product--</option>
                        {products.map(product => (
                            <option key={product.id} value={product._id}>
                                {product.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAddClick}>
                    Add to Map
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function AdminMallMap({ paths, onPathsChange, allProducts }) {
    const [newPath, setNewPath] = useState([]);
    const [selectedPathIndex, setSelectedPathIndex] = useState(null);
    const [productsOnMap, setProductsOnMap] = useState([]);
    const [draggingProduct, setDraggingProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedProduct, setDraggedProduct] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [selectedLine, setSelectedLine] = useState(null);


    const handleProductClick = (e, product) => {
        e.stopPropagation();  // Prevent other mouse events from being triggered
        setSelectedProduct(product);
        setShowSidePanel(true);
    };



    const handleMouseDown = (e, product) => {
       
        setIsDragging(true);
        setDraggedProduct(product);
    };

    const handleMouseMove = (e) => {
        if (isDragging && draggedProduct) {
            const x = e.clientX - 15; // Adjusting for the center of the icon
            const y = e.clientY - 15;

            setProductsOnMap(prevProducts =>
                prevProducts.map(p => p.id === draggedProduct.id ? { ...p, x, y } : p)
            );
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDraggedProduct(null);
    };


    const handleProductDrop = (e, product) => {
        const x = e.clientX;
        const y = e.clientY;
        setProductsOnMap(prevProducts =>
            prevProducts.map(p => p.id === product.id ? { ...p, x, y } : p)
        );
    };

    const handleAddProduct = (productId) => {
        const selectedProduct = allProducts.find(product => product._id === productId);
        const newProduct = {
            id: productId,
            name: selectedProduct?.name,
            x: 100, // Default X position
            y: 100  // Default Y position
        };
        setProductsOnMap(prevProducts => [...prevProducts, newProduct]);
    };


    const handleMapClick = (event) => {
        if (showSidePanel) return;
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
    
        // Check if clicked on an existing point
        const clickedPathIndex = paths.findIndex(path =>
            (Math.abs(path.sx - x) < 5 && Math.abs(path.sy - y) < 5) ||
            (Math.abs(path.ex - x) < 5 && Math.abs(path.ey - y) < 5)
        );
    
        if (clickedPathIndex !== -1 && selectedPathIndex === null) {
            setSelectedPathIndex(clickedPathIndex);
            setNewPath([{ x: paths[clickedPathIndex].ex, y: paths[clickedPathIndex].ey }]);
        } else {
            setNewPath([...newPath, { x, y }]);
        }
    };
    

    const handleSavePath = async () => {
        let updatedPaths = [];
        if (selectedPathIndex !== null) {
            const updatedPath = [...paths[selectedPathIndex], ...newPath];
            updatedPaths = paths.map((path, index) =>
                index === selectedPathIndex ? updatedPath : path
            );
        } else {
            // Convert newPath array to the desired format
            const formattedPath = {
                sx: newPath[0].x,
                sy: newPath[0].y,
                ex: newPath[1].x,
                ey: newPath[1].y
            };
            updatedPaths = [...paths, formattedPath];
        }
        
        try {
            await axiosInstance.post('/path/save', { paths: updatedPaths });
            onPathsChange(updatedPaths);
        } catch (error) {
            console.error("Error saving paths:", error);
        }
        setNewPath([]);
        setSelectedPathIndex(null);
    };

    const handleProductDrag = (e, product) => {
        const x = e.clientX - 15;
        const y = e.clientY - 15;

        setProductsOnMap(prevProducts =>
            prevProducts.map(p => p.id === product.id ? { ...p, x, y } : p)
        );
    };

    const handleDragStart = (e) => {
        const dragImage = new Image();
        e.dataTransfer.setDragImage(dragImage, 0, 0);
    };

    const handleSave = async () => {
        console.log(selectedProduct);
        // Update the productsOnMap state with the new side value for the selected product
        try {
            // Prepare the updated product data
            const updatedProducts = productsOnMap.map(product =>
                product.id === selectedProduct.id
                    ? {
                          x:product.x,
                          y:product.y,
                          side: selectedProduct.side
                      }
                    : null
            );
            // Send the updated product data to the server
            let response=await axiosInstance.put(`/products/update/${selectedProduct.id}`, updatedProducts[0]);
    
            // Update the productsOnMap state with the updated product data
            setProductsOnMap(prevProducts =>
                prevProducts.map(product =>
                    product._id === selectedProduct.id ? response.data : product
                )
            );
    
            // Close the side panel
            setShowSidePanel(false);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleLineClick = (e,pathIndex) => {
        e.stopPropagation();
        setSelectedLine(pathIndex);
    };

    

    const handleDelete = () => {
        // Remove the selected product from the productsOnMap state
        setProductsOnMap(prevProducts =>
            prevProducts.filter(product => product.id !== selectedProduct.id)
        );
        setShowSidePanel(false);
    };

    const handleDeleteLine = async ()=>{
        const updatedPaths = paths.filter((_, index) => index !== selectedLine);
        handleSavePath();
        // onPathsChange(updatedPaths);
        setSelectedLine(null); // Reset the selected line

        Swal.fire(
            'Deleted!',
            'The line has been deleted. please save paths',
            'success'
        );
    }

    return (
        <>
            <div className="mall-map" onClick={handleMapClick}>
                <img src={require('../mallmap.jpg')} style={{ maxHeight: 600 }} alt="Mall Layout" />

                <svg className="paths-svg" style={{ position: 'absolute', top: 0, left: 0 }}>
                    {paths.map((path, pathIndex) =>{ return (
                                <line
                                    key={pathIndex}
                                    x1={path.sx}
                                    y1={path.sy}
                                    x2={path.ex}
                                    y2={path.ey}
                                    stroke={pathIndex === selectedPathIndex ? "green" : "blue"}
                                    strokeWidth="5"
                                    onClick={(e) => handleLineClick(e,pathIndex)}
                                />
                            )})}

                    {newPath.map((point, index, arr) => {
                        if (index < arr.length - 1) {
                            return (
                                <line
                                    key={index}
                                    x1={point.x}
                                    y1={point.y}
                                    x2={arr[index + 1].x}
                                    y2={arr[index + 1].y}
                                    stroke="red"
                                    strokeWidth="5"
                                />
                            );
                        }
                        return null;
                    })}
                </svg>

                {paths.flat().map((point, index) => (
                    <div
                        key={index}
                        className="point"
                        style={{
                            left: point.x + 'px',
                            top: point.y + 'px'
                        }}
                    ></div>
                ))}

                {newPath.map((point, index) => (
                    <div
                        key={index}
                        className="point new-point"
                        style={{
                            left: point.x + 'px',
                            top: point.y + 'px'
                        }}
                    ></div>
                ))}

               
                {productsOnMap.map(product => (
                    <div
                        key={product._id}
                        style={{ position: 'absolute', top: product.y, left: product.x }}
                        draggable
                        onDragStart={handleDragStart}
                        onDrag={(e) => handleProductDrag(e, product)}
                        onDragEnd={(e) => handleProductDrop(e, product)}
                        onMouseDown={(e) => handleMouseDown(e, product)}
                        onClick={(e) => handleProductClick(e, product)}
                    >
                        <FaBox size={30} />
                        <span>{product.name}</span>
                    </div>
                ))}

                {allProducts.map(product => 
                    <div
                        key={product._id}
                        style={{ position: 'absolute', top: product.y, left: product.x }}
                        draggable
                        onDragStart={handleDragStart}
                        onDrag={(e) => handleProductDrag(e, product)}
                        onDragEnd={(e) => handleProductDrop(e, product)}
                        onMouseDown={(e) => handleMouseDown(e, product)}
                        onClick={(e) => handleProductClick(e, product)}
                    >
                        <FaBox size={30} />
                        <span>{product.name}</span>
                    </div>
                    
                )}
                <Modal show={showSidePanel} onHide={() => setShowSidePanel(false)} onMouseDown={(e) => e.stopPropagation()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Product Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control onMouseDown={(e) => e.stopPropagation()} disabled type="text" readOnly value={selectedProduct ? selectedProduct.name : ''} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Select Side</Form.Label>
                                <Form.Control
                                    as="select"
                                    onMouseDown={(e) => e.stopPropagation()}
                                    value={selectedProduct ? selectedProduct.side : 'left'}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, side: e.target.value })}
                                >
                                    <option value="left">Left</option>
                                    <option value="right">Right</option>
                                    <option value="top">Top</option>
                                    <option value="bottom">Bottom</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onMouseDown={(e) => e.stopPropagation()} onClick={() => setShowSidePanel(false)}>
                            Close
                        </Button>
                        <Button variant="success" onMouseDown={(e) => e.stopPropagation()} onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="danger" onMouseDown={(e) => e.stopPropagation()} onClick={handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={selectedLine !== null} onHide={() => setSelectedLine(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Selected Line</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you want to delete this line?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setSelectedLine(null)}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={handleDeleteLine}>
                            Delete Line
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
            <div>
                <hr />
                
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Add Product
                </Button>
                {newPath.length > 0 && (
                    <Button variant='dark' className='m-2' onClick={handleSavePath}>
                        Save Path
                    </Button>
                )}
                <ProductModal
                    products={allProducts}
                    onAdd={handleAddProduct}
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                />
            </div>
        </>
    );
}

export default AdminMallMap;
