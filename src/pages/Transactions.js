import { useEffect, useState, useContext, useReducer } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { API_BASE_URL } from '../utils/config';
import { toast } from 'react-toastify';
import { getTokenHeader } from '../utils/common';
import { FaTrash } from 'react-icons/fa';
import Loader from '../components/Loader';
import moment from 'moment';
import TransactionModal from '../components/TransactionModal';
import { AuthContext } from '../App';
import { TransactionContext } from '../utils/contexts/TransactionContext';
import BudgetBar from '../components/BudgetBar';
import budgetReducer from '../utils/reducers/budgetReducer';

function Transactions() {
    const [budgetState, budgetDispatch] = useReducer(budgetReducer, {data: []});
    const { token } = useContext(AuthContext);
    const { state, dispatch } = useContext(TransactionContext);
    const headers = getTokenHeader(token);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getAllTransaction();
        getBudget();
    }, []);

    const getAllTransaction = () => {
        setLoading(true);
        axios.get(API_BASE_URL + 'transaction', { headers: headers }).then(response => {
            const res = response.data;
            setLoading(false);
            dispatch({type: 'FETCH_DATA', payload: res.data});
        }).catch(error => {
            // const res = error.response.data;
            setLoading(false);
            toast.error("Something went wrong!");
        });
    }

    const getBudget = () => {
        setLoading(true);
        axios.get(API_BASE_URL + 'budget', { headers }).then(Response => {
          setLoading(false);
          const res = Response.data;
          budgetDispatch({type: 'FETCH_DATA', payload: res.data});
        }).catch(error => {
          setLoading(false);
          toast.error('something went wrong in fetching budget!');
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
            // const res = response.data;
            setLoading(false);
            dispatch({type: 'DELETE_TRANSACTION', payload: id});
            toast.success("Transaction deleted successfully");
        }).catch(error => {
            // const res = error.response.data;
            setLoading(false);
            toast.error("Unable to delete!");
        })
    }

    const openModal = () => {
        setShowModal(true);
      };

    function formatTime(inputDate) {
        const now = moment();
        const inputMoment = moment(inputDate);
        
        if (now.isSame(inputMoment, 'day')) {
            return `Today ${inputMoment.format('h:mm a')}`;
        } else if (now.subtract(1, 'day').isSame(inputMoment, 'day')) {
            return `Yesterday ${inputMoment.format('h:mm a')}`;
        } else {
            return inputMoment.format('D MMMM h:mm a');
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
            selector: row => formatTime(row.date),
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
                <BudgetBar state={budgetState.data} />

                <div className="d-flex justify-content-between">
                    <h3>All Transactions</h3>
                    <button className="btn btn-success mb-1 align-self-end" onClick={openModal}>Add Transaction</button>
                </div>
            {loading ? (
                <Loader />
            ) : 
                <DataTable
                className='transaction-table shadow'
                columns={columns}
                data={state.data}
                pagination
                striped
                highlightOnHover
                />
            }

            <TransactionModal showModal={showModal} setShowModal={setShowModal} dispatch={dispatch} budgetDispatch={budgetDispatch} />
        </div>
    ); 
}

export default Transactions;