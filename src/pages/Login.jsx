import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const Login = () => {

    const {user, pass} = useContext(GlobalContext);

    //Local state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cred, setCred] = useState(null);
    const [redirect, setRedirect] = useState(false);

    //Function to handle login
    const handleLogin = (e) => {
        if(username === user && password === pass){
            setCred(1);
            e.preventDefault();
            setTimeout(() => {
                setRedirect(true);
            }, 2000);
        }else{
            setCred(2);
            e.preventDefault();
            setTimeout(() => {
                setCred(null);
            }, 2000);
        }
    }

    useEffect(() => {
        if(redirect){
            window.location.href = '/dashboard';
        }
    }, [redirect]);

    return(
        <>
            <div className="container">

            {cred===1 && 
                <div className="alert alert-success" role="alert">
                    Credenciales Correctas
                    <div
                    style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                    }}
                    >
                        <div className="spinner-border" role="status"></div>
                     </div>
                </div>
            }

            {cred===2 && 
                <div className="alert alert-danger" role="alert">
                    Credenciales Incorrectas
                </div>
            }
            
                <div className="row">

                    <div className="col-md-2 mt-5" id="credentials">
                        <div className="card">
                            <div className="card-header">
                                Credenciales
                            </div>
                            <div className="card-body">
                                <p>Usuario: admin</p>
                                <p>Contraseña: admin</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5 offset-md-1 mt-5">
                        <div className="card">
                            <div className="card-header">
                                <h4>Ingreso Parqueadero</h4>
                            </div>

                            <div className="card-body">
                                <form>
                                    <div className="form-group mb-3">
                                        <label htmlFor="text">Usuario</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="user" 
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input 
                                            type="password"
                                            className="form-control" 
                                            id="password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            />
                                    </div>
                                    <div className="form-group mb-3">
                                        <button 
                                            className="btn btn-primary"
                                            onClick={handleLogin}
                                            >Login</button>
                                    </div>
                                </form>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;