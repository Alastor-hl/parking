import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const VehicleList = () =>{

    const {vehicles, setVehicles} = useContext(GlobalContext);

    const del = (vehicle) => {
        const itemDel = vehicles.filter((i) => i.id !== vehicle.id);
        setVehicles(itemDel);
    };

    return(
        <>
            <div className="col-md-6">
                <h2 className="text-center">Vehiculos Registrados</h2>
                <hr/>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Propietario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle, index) => (
                            <tr key={index}>
                                <td>{vehicle.plate}</td>
                                <td>{vehicle.identification}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={()=>{del(vehicle)}}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default VehicleList;