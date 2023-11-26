import { GlobalContext } from '../context/GlobalContext';
import { useState, useContext, useEffect } from 'react';

const ListingById = ({identification, select}) => {

    const {vehicles} = useContext(GlobalContext);

    const [searchList, setSearchList] = useState([]);

    //Effect Function to filter the list to be displayed as search
    useEffect(() => {

        let filteredList = vehicles;
    
        if(identification !== '') {
            filteredList = filteredList.filter(item => item.identification.toLowerCase().includes(identification.toLowerCase()));
        }
    
        setSearchList(filteredList);
    }, [identification, vehicles]);

    return(
        <>
            <h2 className="text-center">Vehiculos Registrados Por Identificación</h2>
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
                    {searchList.map((vehicle, index) => (
                        <tr key={index}>
                            <td>{vehicle.plate}</td>
                            <td>{vehicle.identification}</td>
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

export default ListingById;