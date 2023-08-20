import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { toast } from 'react-toastify';
import { headers } from '../App';
import { FaTrash } from 'react-icons/fa';
import Loader from '../components/Loader';
import TransactionModal from '../components/TransactionModal';
import '../styles/transactions.css';

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
            // const res = error.response.data;
            setLoading(false);
            toast.error("Something went wrong!");
        });
    }

    const handleDelete = (id) => {
        const userConfirmed = window.confirm('Are you sure you want to delete this item?');
        if (userConfirmed) {
            deleteTransaction(id);
        }
    }

    const deleteTransaction = (id) => {
        setLoading(true);
        axios.delete(API_BASE_URL + 'transaction/' + id, { headers: headers }).then(response => {
            const res = response.data;
            setLoading(false);
            setTransactions(res.data);
            toast.success("Transaction deleted successfully");
        }).catch(error => {
            const res = error.response.data;
            setLoading(false);
            toast.error("Unable to delete!");
        })
    }

    const openModal = () => {
        setShowModal(true);
      };

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

    return(
            
            <div className='container'>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-success mb-1" onClick={openModal}>Add Transaction</button>
                </div>
            {loading ? (
                <Loader />
            ) :
                <DataTable
                    title="All Transactions"
                    className='transaction-table shadow'
                    columns={columns}
                    data={transactions}
                    pagination
                    striped
                    highlightOnHover
                />
            }

            <TransactionModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    ); 
}

export default Transactions;