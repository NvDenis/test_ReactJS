import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fecthAllUser } from '../services/UserServices';


const TableUsers = () => {

    const [listUsers, setListUsers] = useState([]);


    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        let res = await fecthAllUser();

        if (res && res.data) {
            setListUsers(res.data);
        }
    }

    console.log(listUsers);


    return (
        <>
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
        </>)
}

export default TableUsers;