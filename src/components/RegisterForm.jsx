import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { GlobalContext } from '../context/GlobalContext';
import { useState, useContext, useEffect } from 'react';

const RegisterForm = () => {

    const {vehicles, setVehicles} = useContext(GlobalContext);
    const [cred, setCred] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [identification, setIdentification] = useState('');
    const [plate, setPlate] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [cylinder, setCylinder] = useState('');

    const handleDropdown = (e) => {
        setSelectedOption(e);
    }

    const handleSave = (e) => {
        e.preventDefault();

        if(!selectedOption || !identification || !plate || !brand){
            setCred(2);
            e.preventDefault();
            setTimeout(() => {
                setCred(null);
            }, 2000);
        }else if(vehicles.filter(vehicle => vehicle.plate === plate).length > 0 || vehicles.filter(vehicle => vehicle.identification === identification).length > 0){
            setCred(3);
            e.preventDefault();
            setTimeout(() => {
                setCred(null);
            }, 2000);
            setPlate('');
            setBrand('');
            setModel('');
            setCylinder('');
            setIdentification('');
            setSelectedOption(null);
        }else{
            setCred(1);
            e.preventDefault();
            setTimeout(() => {
                setCred(null);
            }, 2000);
            const newVehicle = {
                type: selectedOption,
                identification,
                plate,
                brand,
                model: selectedOption === 'Carro' ? model : null,
                cylinder: selectedOption === 'Moto' ? cylinder : null
            }
            setVehicles([...vehicles, newVehicle]);
            setPlate('');
            setBrand('');
            setModel('');
            setCylinder('');
            setIdentification('');
            setSelectedOption(null);
        }
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
                        <div className="alert alert-success" role="alert">Agregado</div>
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
                        <div className="alert alert-danger" role="alert">Rellene los campos</div>
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
                        <div className="alert alert-warning" role="alert">Placa o identificacion existente</div>
                    </div>
            }   

            <div className="col-md-6">
                <h2 className="text-center">Formulario Registro</h2>
                <hr/>
                <form>
                    <div className="mb-3">
                    <Dropdown onSelect={handleDropdown}>
                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                            {selectedOption ? selectedOption : 'Tipo de Vehiculo'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Carro" >Carro</Dropdown.Item>
                            <Dropdown.Item eventKey="Moto" >Moto</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Identificacion</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value = {identification}
                            onChange = {(e) => setIdentification(e.target.value)}
                            />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Placa</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value = {plate}
                            onChange = {(e) => setPlate(e.target.value)}
                            />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Marca</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value = {brand}
                            onChange = {(e) => setBrand(e.target.value)}
                            />
                    </div>

                    {selectedOption === 'Carro' &&
                        <div className="mb-3">
                            <label className="form-label">Modelo</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value = {model}
                                onChange = {(e) => setModel(e.target.value)}
                                />
                        </div>
                    }
                    {selectedOption === 'Moto' &&
                        <div className="mb-3">
                            <label className="form-label">Cilindraje</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value = {cylinder}
                                onChange = {(e) => setCylinder(e.target.value)}
                                />
                        </div>
                    }
                    <div className="mb-3">
                        <button 
                            className="btn btn-primary" 
                            onClick={handleSave}
                            >
                                Guardar
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegisterForm;