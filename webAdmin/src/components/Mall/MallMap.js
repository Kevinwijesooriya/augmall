import React, { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosService';
import axios from 'axios';
import { Form, Button, Alert, Container, Row, Col, Card , Table, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import AdminMallMap from '../../services/AdminMallMap';

const MallMap = ()=>{
    const [paths, setPaths] = useState([]);
    const [Products,setProducts]=useState([]);
    useEffect(() => {
        async function fetchPaths() {
            try {
                const response = await axiosInstance.get('/path');
                setPaths(response.data);
            } catch (error) {
                console.error("Error fetching paths:", error);
            }
        }
        async function fetchProducts(){
            try {
                const response = await axiosInstance.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching paths:", error);
            }
        }
        fetchProducts();
        fetchPaths();
    }, []);
    return (
        <>
            <div>
                <h1>Paths Management</h1>
            </div>
            <div className='mt-2'>
                <AdminMallMap paths={paths} allProducts={Products} onPathsChange={setPaths} />
            </div>
        </>
    )
}
export default MallMap;