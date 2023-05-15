import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fecthAllUser } from '../services/UserServices';
import ReactPaginate from 'react-paginate';
import ModalAddNewUser from './ModalAddNewUser';
import ModalEditUser from './ModalEditUser';
import { debounce } from "lodash"
import _ from 'lodash'
import ModalDeleteUser from './ModalDeleteUser';
import Papa from 'papaparse';
import { CSVLink } from "react-csv";
import './TableUsers.scss'
import { toast } from 'react-toastify';

const TableUsers = () => {

    const [listUsers, setListUsers] = useState([]);
    // const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setShowModalEdit] = useState(false);
    const [isShowModalDelete, setShowModalDelete] = useState(false);
    const [dataExport, setDataExport] = useState([]);

    // const [sortBy, setSortBy] = useState('asc');
    // const [sortField, setSortField] = useState('id')

    useEffect(() => {
        getUsers(1);
    }, [])

    const getUsers = async (page) => {
        let res = await fecthAllUser(page);
        if (res && res.data) {
            setListUsers(res.data);
            // setTotalUsers(res.total);
            setTotalPages(res.total_pages)
        }
    }

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    }

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setShowModalEdit(false);
        setShowModalDelete(false);
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers])
    }

    const handleEditUser = (user) => {
        setShowModalEdit(true);
        setDataUserEdit(user);
    }

    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = cloneListUsers.findIndex(item => item.id === user.id)

        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);

    }

    const handleDeleteUser = (item) => {
        setDataUserDelete(item);
        setShowModalDelete(true);
    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
        setListUsers(cloneListUsers);
    }

    const handleSort = (sortBy, sortField) => {
        // setSortBy(sortBy);
        // setSortField(sortField);
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        setListUsers(cloneListUsers);
    }


    const handleSearch = debounce((e) => {
        let term = e.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers);

            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term));
            setListUsers(cloneListUsers);

        } else {
            getUsers(1);
        }
    }, 500)


    const getUsersExport = (event, done) => {
        let data = [];
        if (listUsers && listUsers.length > 0) {
            data.push(['Id', 'Email', 'First name', 'Last name']);
            listUsers.map(item => {
                let arr = [];
                arr[0] = item.id
                arr[1] = item.email
                arr[2] = item.first_name
                arr[3] = item.last_name
                data.push(arr);
            })
            setDataExport(data);
            done();

        }
    }

    const handleImportCSV = (e) => {

        if (e && e.target && e.target.files[0]) {
            let file = e.target.files[0];

            if (file.type !== 'text/csv') {
                toast.error('Only accept csv files...')
                return;
            }

            // Parse local CSV file
            Papa.parse(file, {
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (
                                rawCSV[0][0] !== 'email'
                                || rawCSV[0][1] !== 'first_name'
                                || rawCSV[0][2] !== 'last_name'
                            ) {
                                toast.error('Wrong format header CSV file!')
                            } else {
                                let data = [];
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {}
                                        obj.email = item[0]
                                        obj.first_name = item[1]
                                        obj.last_name = item[2]
                                        data.push(obj);
                                    }
                                })
                                setListUsers(data)
                                console.log('check data >>>', data);
                            }

                        } else {
                            toast.error('Wrong format CSV file!')
                        }

                    } else {
                        toast.error('Not found data on file CSV!')
                    }

                }
            });

        }




    }

    return (
        <>
            <div className='my-3 add-new'>
                <span>List Users:</span>
                <div className='group-btns'>
                    <label
                        className='btn btn-warning'
                        htmlFor='duycute'
                    >
                        <i className="fa-solid fa-file-import"></i>  Import
                    </label>
                    <input
                        id='duycute'
                        type='file'
                        hidden
                        onChange={e => handleImportCSV(e)}
                    />



                    <CSVLink
                        data={dataExport}
                        filename={"users.csv"}
                        className="btn btn-primary"
                        asyncOnClick={true}
                        onClick={getUsersExport}
                    >
                        <i className="fa-solid fa-file-arrow-down"></i>  Export

                    </CSVLink>

                    <button
                        className='btn btn-success'
                        onClick={() => setIsShowModalAddNew(true)
                        }>
                        <i className="fa-solid fa-circle-plus"></i>  Add new


                    </button>
                </div>

            </div>

            <div className='col-4 my-3'>
                <input
                    className='form-control'
                    placeholder='Search by email'
                    onChange={e => handleSearch(e)}
                />
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th >
                            <div className='sort-header'>
                                <span>ID</span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down-long"
                                        onClick={() => handleSort('desc', 'id')}
                                    >

                                    </i>
                                    <i
                                        className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort('asc', 'id')}
                                    >

                                    </i>
                                </span>
                            </div>

                        </th>
                        <th>Email</th>
                        <th>
                            <div className='sort-header'>
                                <span>First Name</span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down-long"
                                        onClick={() => handleSort('desc', 'first_name')}
                                    >

                                    </i>
                                    <i
                                        className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort('asc', 'first_name')}
                                    >

                                    </i>
                                </span>
                            </div>
                        </th>
                        <th>Last Name</th>
                        <th>Actions</th>
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
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button
                                            className='btn btn-warning mx-3'
                                            onClick={() => handleEditUser(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => handleDeleteUser(item)}
                                        >
                                            Delete</button>
                                    </td>
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
            <ModalEditUser
                show={isShowModalEdit}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />

            <ModalDeleteUser
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </>)
}

export default TableUsers;