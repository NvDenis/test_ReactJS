import { Container } from 'react-bootstrap';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect } from 'react';

import { UserContext } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';
import './App.scss';
import { useSelector } from 'react-redux';

function App() {

  const dataUserRedux = useSelector(state => state.user.account)

  console.log('check data redux', dataUserRedux);

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
          <AppRoutes />
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
