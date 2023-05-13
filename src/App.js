import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import ModalAddNewUser from './components/ModalAddNewUser';
import { useState } from 'react';

function App() {

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const handleClose = () => {
    setIsShowModalAddNew(false);
  }

  return (
    <div className="app-container">
      <Header />

      <Container>
        <div className='my-3 add-new'>
          <span>List Users:</span>
          <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>add new user</button>
        </div>
        <TableUsers />
        <ModalAddNewUser
          show={isShowModalAddNew}
          handleClose={handleClose}
        />
      </Container>
    </div>
  );
}

export default App;
