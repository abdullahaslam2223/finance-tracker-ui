import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { toast } from 'react-toastify';
import { headers } from '../App';
import { FaTrash, FaTimes } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import '../styles/transactions.css';

const handleDelete = (id) => {
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (userConfirmed) {
        toast.success(id + " Delete function called");
    } else {
        toast.info(id + " Did not deleted");
    }
}

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Category',
        selector: row => row.category,
        sortable: true,
    },
    {
        name: 'Amount',
        selector: row => row.amount,
        sortable: true,
    },
    {
        name: 'Date',
        selector: row => row.date,
        sortable: true,
    },
    {
        name: 'Transaction Type',
        selector: row => row.is_income ? <span className='bg-success p-5 text-light'>Income</span> : <span className='bg-danger p-5 text-light'>Expense</span>,
        sortable: true,
    },
    {
        name: 'Delete',
        selector: 'delete',
        sortable: true,
        cell: (row) => (
            <FaTrash style={{cursor: "pointer"}} onClick={() => handleDelete(row.id)} />
        ),
    },
];

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getAllTransaction();
    }, []);
    
    const getAllTransaction = () => {
        setLoading(true);
        axios.get(API_BASE_URL + 'transaction', { headers: headers }).then(response => {
            const res = response.data;
            setLoading(false);
            setTransactions(res.data);
        }).catch(error => {
            const res = error.response.data;
            setLoading(false);
            toast.error("Something went wrong");
        });
    }

    const openModal = () => {
        setShowModal(true);
      };
    
    const closeModal = () => {
        setShowModal(false);
    };

    return(
        <div className='container'>
             <div className="d-flex justify-content-end">
                <button className="btn btn-success mb-1" onClick={openModal}>Add Transaction</button>
            </div>
            <DataTable
                title="All Transactions"
                className='transaction-table shadow'
                columns={columns}
                data={transactions}
                pagination
                striped
                highlightOnHover
            />

      {/* Modal */}
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header>
            <Modal.Title>My Modal</Modal.Title>
            <FaTimes className="icon-close" style={{cursor: "pointer"}} onClick={closeModal} />
            </Modal.Header>
            <Modal.Body>
            This is the content of the modal. You can define and use it in the same component.
            </Modal.Body>
            <Modal.Footer>
            {/* Button to close the modal */}
            <Button variant="success" onClick={closeModal}>
                Add
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    ); 
}

export default Transactions;