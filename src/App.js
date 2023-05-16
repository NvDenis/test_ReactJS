import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import Login from './components/Login';

function App() {

  const { user, login } = useContext(UserContext);

  console.log('check user', user);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      login(localStorage.getItem('email'), localStorage.getItem('token'))
    }
  }, [])

  return (
    <>
      <div className="app-container">
        <Header />

        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<TableUsers />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Container>
      </div>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  );
}

export default App;
