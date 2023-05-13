import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalAddNewUser = (props) => {

    const { show, handleClose } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleSaveUser = () => {
        console.log(name, job);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Job</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                value={job}
                                onChange={(e) => setJob(e.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNewUser;