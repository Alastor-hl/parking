import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import VehicleList from '../components/VehicleList';
import RegisterForm from '../components/RegisterForm';
import ParkingLot from '../components/ParkingLot';
const Dashboard = () => {
    
    return(
        <>
            <div className="container">
                <h1 className="text-center">Dashboard</h1>
                <hr/>
                <div className="row">

                    <VehicleList/>
                    <RegisterForm/>
                    <ParkingLot/>
                    
                </div>
            </div>
        </>
    )
}

export default Dashboard;