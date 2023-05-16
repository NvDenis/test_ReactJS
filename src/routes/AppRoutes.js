import { Routes, Route } from 'react-router-dom';

import TableUsers from '../components/TableUsers'
import Home from '../components/Home';
import Login from '../components/Login';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route
                    path='/users'
                    element={
                        <PrivateRoutes >
                            <TableUsers />
                        </PrivateRoutes>}
                />
            </Routes>
            {/* <PrivateRoutes path='/users'>
                <TableUsers />
            </PrivateRoutes> */}

        </>
    )
}

export default AppRoutes;