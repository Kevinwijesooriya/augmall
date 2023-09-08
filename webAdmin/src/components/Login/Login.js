import React, { useEffect, useState } from 'react';
import '../../Login.css';
import axiosInstance from '../../services/axiosService';
import axios from 'axios';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token,setToken]=useState(localStorage.getItem('_token'));
    useEffect(()=>{
        if(localStorage.getItem('_token')){
            window.location.replace('./');
        }
    },[]);
    
    const handleSubmit = async (e) => {
        setError('');
        e.preventDefault();
        axios.post('http://localhost:3000/users/login',{
            email:username,
            password:password
        })
        .then((response) => {
            const token = response.data.token;
            console.log(response.data);
            localStorage.setItem('userinfo',response.data);
            setToken(token);
            localStorage.setItem('_token', token);
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error logging in: ", error);
            setError("Invalid credentials!");
        });
    };
    return (
        <div className="login-wrapper">
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md="4">
                        <Card className='shadow' style={{ marginTop: 80 }}>
                            <Card.Body>
                                <div className='text-center'>
                                    <img src={require('../../logo.png')} style={{ height: 100, marginTop: -100, borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                                </div>
                                <h4 className='text-center'>Welcome to AugMall</h4>
                                <hr />
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Group>
                                    <div className="d-grid gap-2">
                                        <div className='text-right'>
                                            <Button variant="dark" className='mt-3 w-100' type="submit">Login</Button>
                                        </div>
                                    </div>
                                    {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}