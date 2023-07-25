import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { fetchAllUser } from '../services/userService';

function TableUsers() {

    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])


    const getUsers = async () => {
        let res = await fetchAllUser();
        if (res && res.data && res.data.data) {
            setListUsers(res.data.data)
        }
    }

    return (
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 &&
                    listUsers.map((user, index) => {
                        return (
                            <tr key={`users-${index}`}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default TableUsers