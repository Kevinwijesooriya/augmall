import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';

const Dashboard = ({ salesData, productSalesData }) => {
    const [userinfo,setUserinfo]=useState(localStorage.getItem('userinfo'));
    console.log(userinfo);
    return (
        <div>
            <div className='container'>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <div>
                        <img src={require('../../avatar.png')} style={{width:60,height:60,borderRadius:10000}}/>
                    </div>
                    <div style={{marginLeft:10}}>
                        <h3>Welcome back {userinfo.username}</h3>
                    </div>
                </div>
            </div>
            <h2>Sales Overview</h2>
            {/* <Line data={salesData} /> */}

            <h2>Product Sales</h2>
            {/* <Bar data={productSalesData} /> */}
        </div>
    );
};

export default Dashboard;
