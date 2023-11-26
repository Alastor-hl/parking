import style from '../styles/Parking.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { GlobalContext } from '../context/GlobalContext';
import { useState, useContext, useEffect } from 'react';
import ListingById from './ListingById';   
import ListingByPlate from './ListingByPlate';

const ParkingLot = () => {

    const {vehicles, setVehicles, carPark, setCarPark, bikePark, setBikePark} = useContext(GlobalContext);
    const [selectedOption, setSelectedOption] = useState(null);

    //Used for filtering
    const [identification, setIdentification] = useState('');
    const [plate, setPlate] = useState('');

    const [cred, setCred] = useState(null);

    //Contains the selected vehicle
    const [selected, setSelected] = useState(null);

    const actualDate = () => {
        const fechaYHoraActual = new Date();
        const opciones = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        const fechaFormateada = fechaYHoraActual.toLocaleString('es-ES', opciones);
        return fechaFormateada;
    };

    const handleDropdown = (e) => {
        setSelectedOption(e);
    }

    const bikeIn = (item) => {

        if(!selected){
            setCred(3);
            setTimeout(() => {
                setCred(null);
            }, 2000);
            return;
        }

        if(item.type === selected.type){
            item.vehicle = selected.plate;
            item.date = actualDate();
            setBikePark([...bikePark]);
            setSelected(null);
        }
        else{
            setCred(2);
            setTimeout(() => {
                setCred(null);
            }, 2000);
        }
    }
    const bikeOut = (item) => {
        item.vehicle = null;
        item.date = null;
        setBikePark([...bikePark]);
        setSelected(null);
    }

    const carIn = (item) => {

        if(!selected){
            setCred(3);
            setTimeout(() => {
                setCred(null);
            }, 2000);
            return;
        }

        if(item.type === selected.type){
            item.vehicle = selected.plate;
            item.date = actualDate();
            setCarPark([...carPark]);
            setSelected(null);
        }
        else{
            setCred(2);
            setTimeout(() => {
                setCred(null);
            }, 2000);
        }
    }
    const carOut = (item) => {
        item.vehicle = null;
        item.date = null;
        setCarPark([...carPark]);
        setSelected(null);
    }

    const select = (vehicle) => {
        setCred(1);
        setSelectedOption(null);
        setTimeout(() => {
            setCred(null);
        }, 2000);
        setSelected(vehicle);
    } 


    return(
        <>
            {cred===1 && 
                    <div
                    style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                    width: '40%',
                    textAlign: 'center'
                    }}
                    >
                        <div className="alert alert-success" role="alert">Seleccionado Correctamente</div>
                    </div>
            }
            {cred===2 && 
                    <div
                    style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                    width: '40%',
                    textAlign: 'center'
                    }}
                    >
                        <div className="alert alert-danger" role="alert">Vehiculo no correspondiente</div>
                    </div>
            }
            {cred===3 && 
                    <div
                    style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                    width: '40%',
                    textAlign: 'center'
                    }}
                    >
                        <div className="alert alert-warning" role="alert">Seleccione un vehiculo antes de asignar lote</div>
                    </div>
            }

            <div className="container">
                <h1>Parqueo</h1>
                <hr/>
                <form>
                    <div className="mb-3">
                    <Dropdown onSelect={handleDropdown}>
                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                            {selectedOption ? selectedOption : 'Ingreso mediante'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Identificacion" >Identificación</Dropdown.Item>
                            <Dropdown.Item eventKey="Placa" >Placa</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>

                    {selectedOption === 'Identificacion' &&
                        <div className="mb-3">
                            <label className="form-label">Identificación</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={identification}
                                onChange={(e) => setIdentification(e.target.value)}
                                />
                                <ListingById 
                                    identification={identification}
                                    select={select}
                                ></ListingById>

                        </div>
                        
                    }
                    {selectedOption === 'Placa' &&
                        <div className="mb-3">
                            <label className="form-label">Placa</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={plate}
                                onChange={(e) => setPlate(e.target.value)}
                                />
                                <ListingByPlate 
                                    plate={plate}
                                    select={select}    
                                ></ListingByPlate>
                        </div>
                    }
                </form>
                
               <div style={{
                    height: '50px'
               }}></div>

                {
                <>
                    <hr />
                    <h1>Puestos parqueadero</h1>

                    <div className="row">

                        <div className="col-md-6">
                            {carPark.map((item, index) => (
                                <div className="card" key={index} style={{marginBottom:'10px'}}>
                                    <div className="card-header">
                                        {item.lot}
                                    </div>
                                    <div className="card-body">
                                        <p>{item.vehicle ? `Placa: ${item.vehicle} Fecha: ${item.date}` : 'Disponible'}</p>
                                        {item.vehicle && <button className="btn btn-danger"onClick={() => {carOut(item)}}>Dar Salida</button>}
                                        {!item.vehicle && <button className="btn btn-success"onClick={() => {carIn(item)}}>Asignar</button>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col-md-6">
                        {bikePark.map((item, index) => (
                                <div className="card" key={index} style={{marginBottom:'10px'}}>
                                    <div className="card-header">
                                        {item.lot}
                                    </div>
                                    <div className="card-body">
                                        <p>{item.vehicle ? `Placa: ${item.vehicle} Fecha: ${item.date}` : 'Disponible'}</p>
                                        {item.vehicle && <button className="btn btn-danger"onClick={()=>{bikeOut(item)}}>Dar Salida</button>}
                                        {!item.vehicle && <button className="btn btn-success"onClick={()=>{bikeIn(item)}}>Asignar</button>}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </>
                }
            </div>
            
        </>
    )
}

export default ParkingLot;