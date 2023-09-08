import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../services/axiosService';

const UsersList = ({ users }) => {
    const [Users, setUsers] = useState(users);
    const [currentUser, setCurrentUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleSave = async () => {
        if (currentUser) {
            try {
                const response = await axiosInstance.post(`/users/update?id=${currentUser._id}`, currentUser);
                const updatedUsers = Users.map(user => 
                    user._id === currentUser._id ? response.data : user
                );
                setUsers(updatedUsers);
            } catch (error) {
                alert("Error upadting user : "+error.message);
                console.error("Error updating user:", error);
            }
        } else {
            try {
                const response = await axiosInstance.post('/users/create', currentUser);
                setUsers([...Users, response.data]);
            } catch (error) {
                console.error("Error adding user:", error);
            }
        }
        setShowModal(false);
    };

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await axiosInstance.delete(`/users/delete/${userId}`);
            const updatedUsers = Users.filter(user => user._id !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };
    const openAddUserModal = () => {
        setCurrentUser(null); 
        setShowModal(true);  
    };

    return (
        <>
            <Button onClick={openAddUserModal} className='mb-4'>Add User</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Country</th>
                        <th>Total Orders</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.country}</td>
                            <td>{user.orders}</td>
                            <td>{user.role}</td>
                            <td>
                                <Button onClick={() => { setCurrentUser(user); setShowModal(true); }}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentUser ? 'Update User' : 'Add User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='name' onChange={handleInputChange} type="text" defaultValue={currentUser?.username} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control name='email' onChange={handleInputChange} type="email" defaultValue={currentUser?.email} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control name='password' onChange={handleInputChange} type="password" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UsersList;
