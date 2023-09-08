import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import Login from './components/Login/Login';
import AdminPanel from './components/AdminPanel';
import UsersList from './components/Users/UsersList';

import { useState } from 'react';
import ProductManagement from './components/Products/ProductManagement';
import Categories from './components/Category/Categories';
import MallMap from './components/Mall/MallMap';
function App() {
    const [token, setToken] = useState(localStorage.getItem('_token'));
    if (!token) {
        return <Login setToken={setToken} />
    }
    const salesData = {/* ... */ };
    const productSalesData = {/* ... */ };
    const users = [/* ... */];

    return (
        <div className="wrapper">
            <Router>
                <AdminPanel>
                    <Routes>
                        <Route path="/" element={<Dashboard salesData={salesData} productSalesData={productSalesData} />} />
                        <Route path="/products" element={<ProductManagement />} />
                        <Route path="/users" element={<UsersList users={users} />} />
                        <Route path="/categories" element={<Categories />}/>
                        <Route path="/mall-setup" element={<MallMap />}/>
                    </Routes>
                </AdminPanel>
            </Router>
        </div>

    );
}
export default App;
