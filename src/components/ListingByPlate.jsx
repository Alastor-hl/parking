import { GlobalContext } from '../context/GlobalContext';
import { useState, useContext, useEffect } from 'react';

const ListingByPlate = ({plate, select}) => {

    const {vehicles} = useContext(GlobalContext);

    const [searchList, setSearchList] = useState([]);

    //Effect Function to filter the list to be displayed as search
    useEffect(() => {

        let filteredList = vehicles;
    
        if(plate !== '') {
            filteredList = filteredList.filter(item => item.plate.toLowerCase().includes(plate.toLowerCase()));
        }
    
        setSearchList(filteredList);
    }, [plate, vehicles]);

    return(
        <>
            <h2 className="text-center">Vehiculos Registrados Por Placa</h2>
            <hr/>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Propietario</th>
                        <th>Placa</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Cilindraje</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {searchList.map((vehicle, index) => (
                        <tr key={index}>
                            <td>{vehicle.type}</td>
                            <td>{vehicle.identification}</td>
                            <td>{vehicle.plate}</td>
                            <td>{vehicle.brand}</td>
                            <td>{vehicle.model}</td>
                            <td>{vehicle.cylinder}</td>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={(e)=>{
                                    e.preventDefault();
                                    select(vehicle)
                                    }}>Seleccionar Vehiculo</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ListingByPlate;