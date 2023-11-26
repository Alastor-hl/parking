import {useState} from 'react';
import { GlobalContext } from './GlobalContext';

const GlobalProvider = ({children}) => {
    const [vehicles, setVehicles] = useState([]);
    const [carPark, setCarPark] = useState([
        {
            lot: "1C",
            vehicle: null,
            type: "Carro",
            date: null
        },
        {
            lot: "2C",
            vehicle: null,
            type: "Carro",
            date: null
        },
        {
            lot: "3C",
            vehicle: null,
            type: "Carro",
            date: null
        },
        {
            lot: "4C",
            vehicle: null,
            type: "Carro",
            date: null
        },
        {
            lot: "5C",
            vehicle: null,
            type: "Carro",
            date: null
        },
    ]);

    const [bikePark, setBikePark] = useState([
        {
            lot: "1M",
            vehicle: null,
            type: "Moto",
            date: null
        },
        {
            lot: "2M",
            vehicle: null,
            type: "Moto",
            date: null
        },
        {
            lot: "3M",
            vehicle: null,
            type: "Moto",
            date: null
        },
        {
            lot: "4M",
            vehicle: null,
            type: "Moto",
            date: null
        },
        {
            lot: "5M",
            vehicle: null,
            type: "Moto",
            date: null
        },
    ]);

    const user = 'admin'
    const pass = 'admin'

    return(
        <GlobalContext.Provider value={{
            vehicles, 
            setVehicles,

            carPark, 
            setCarPark,

            bikePark, 
            setBikePark,
            
            user,
            pass

            }}>
            {children}
        </GlobalContext.Provider>
    )
};

export default GlobalProvider;