import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';

const AdminPanel = ({ children }) => {

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, log out',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                Swal.fire('Logged out', 'You have been logged out successfully', 'success');
                window.location.reload();
            }
        });
    };

    return (
        <>
            <nav class="navbar navbar-expand-md navbar-light bg-default">
                <a class="navbar-brand" href="./">
                    <img src={require('../logo.png')} style={{ height: 60 }} />
                </a>
                <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation"></button>
                <div class="collapse navbar-collapse" id="collapsibleNavId" style={{ justifyContent: 'flex-end' }}>
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item active">
                            <a class="nav-link" href="./">Home</a>
                        </li>

                        <li class="nav-item active">
                            <a class="nav-link" href="#!">AugMall v1.0 </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#!" onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="main">
                <Sidebar />
                <div className='submain'>
                    {children}
                </div>
            </div>
        </>
    );
};

export default AdminPanel;
