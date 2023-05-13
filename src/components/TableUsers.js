import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fecthAllUser } from '../services/UserServices';
import ReactPaginate from 'react-paginate';
import ModalAddNewUser from './ModalAddNewUser';

const TableUsers = () => {

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getUsers(1);
    }, [])

    const getUsers = async (page) => {
        let res = await fecthAllUser(page);
        if (res && res.data) {
            setListUsers(res.data);
            setTotalUsers(res.total);
            setTotalPages(res.total_pages)
        }
    }

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    }

    const handleClose = () => {
        setIsShowModalAddNew(false);
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers])
    }


    return (
        <>
            <div className='my-3 add-new'>
                <span>List Users:</span>
                <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>add new user</button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>@{item.last_name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}

                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
            />

            <ModalAddNewUser
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />
        </>)
}

export default TableUsers;