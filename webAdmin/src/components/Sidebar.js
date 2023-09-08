import React from 'react';
import { Nav } from 'react-bootstrap';
import '../css/sidebar.css';
const Sidebar = () => {
    return (
        <aside>
            <div class="sidebar left ">
                <ul class="list-sidebar bg-defoult">
                    <li> <Nav.Link href="/">Dashboard</Nav.Link></li>
                    <li> <Nav.Link href="/categories">Category</Nav.Link></li>
                    <li> <Nav.Link href="/products">Products</Nav.Link></li>
                    <li> <Nav.Link href="/">Orders</Nav.Link></li>
                    <li> <Nav.Link href="/users">Users</Nav.Link></li>
                    <li> <Nav.Link href="/users">App Settings</Nav.Link></li>
                    <li> <Nav.Link href="/mall-setup">Mall Map Setup</Nav.Link></li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
