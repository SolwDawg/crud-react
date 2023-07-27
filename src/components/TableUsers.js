import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { fetchAllUser } from '../services/userService';
import ReactPaginate from 'react-paginate';

function TableUsers() {

    const [listUsers, setListUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);    

    useEffect(() => {
        getUsers(1);
    }, [])

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    }

    const getUsers = async (pages) => {
        let res = await fetchAllUser(pages);
        if (res && res.data) {
            setTotalPages(res.total_pages)
            setListUsers(res.data)
        }
    }

    return (
        <>
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
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </>
    )
}

export default TableUsers