import {BrowserRouter, Route, Routes} from 'react-router-dom';
import GlobalProvider from './context/GlobalProvider';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
    return(
        <>
            <BrowserRouter>
                <GlobalProvider>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </GlobalProvider>
            </BrowserRouter>
        </>
    )
}

export default App;