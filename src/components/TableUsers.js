import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';
import { ToastContainer } from 'react-toastify';


import { fetchAllUser } from '../services/userService';
import styles from '../App.scss';
import ModalAddNew from './ModalAddNew';


const cx = classNames.bind(styles)

function TableUsers() {

    const [listUsers, setListUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModal, setIsShowModal] = useState(false);

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

    const handleUpdateTable = (users) => {
        setListUsers([users, ...listUsers])
    }

    return (
        <>
            <div className={cx('my-3 add-new')}>
                <h4>List user:</h4>
                <button className='btn btn-success' onClick={() => setIsShowModal(true)}>Add user</button>
            </div>
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
            <ModalAddNew
                show={isShowModal}
                handleClose={() => setIsShowModal(false)}
                handleUpdateTable={handleUpdateTable}
            />
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
    )
}

export default TableUsers