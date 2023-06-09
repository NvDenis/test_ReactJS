import { Routes, Route } from 'react-router-dom';
import TableUsers from '../components/TableUsers'
import Home from '../components/Home';
import Login from '../components/Login';
import PrivateRoutes from './PrivateRoutes';
import NotFound from './NotFound'

const AppRoutes = () => {
    console.log('abc');
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
                <Route path='*' element={<NotFound />} />
            </Routes>
            {/* <PrivateRoutes path='/users'>
                <TableUsers />
            </PrivateRoutes> */}

        </>
    )
}

export default AppRoutes;