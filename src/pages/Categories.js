import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../App";
import { getTokenHeader } from "../utils/common";
import axios from "axios";
import { API_BASE_URL } from "../utils/config";
import { toast } from "react-toastify";
import { CategoryContext } from "../utils/contexts/CategoryContext";
import {
    addCategory,
    updateCategory,
    deleteCategory
} from "../utils/api-routes.js/categoryRoutes";
import DataTable from "react-data-table-component";
import Loader from "../components/Loader";
import { FaTrash } from "react-icons/fa";
import CategoryModal from "../components/CategoryModal";
import BudgetBar from "../components/BudgetBar";
import '../styles/data-table.css';

function Categories() {
    const { token } = useContext(AuthContext);
    const headers = getTokenHeader(token);
    const { state, dispatch } = useContext(CategoryContext);

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleAddCategory = async (newCategory) => {
        try {
          const addedCategory = await addCategory(newCategory, headers);
          dispatch({ type: 'ADD_CATEGORY', payload: addedCategory });
          toast.success("Category added successfully");
        } catch (error) {
          toast.error("Error in adding category");
        }
    };

    const getAllCategories = () => {
        setLoading(true);
        axios.get(API_BASE_URL + 'category', { headers: headers }).then(response => {
            const res = response.data;
            setLoading(false);
            dispatch({ type: 'FETCH_DATA_SUCCESS', payload: res.data });
        }).catch(error => {
            // const res = error.response.data;
            setLoading(false);
            toast.error("Something went wrong!");
        });
    }

    const handleDeleteCategory = async (categoryId) => {
        const userConfirm = window.confirm("Are you sure, you want to delete category?");
        if(userConfirm) {
            try {
                const response = await deleteCategory(categoryId, headers);
                dispatch({ type: 'DELETE_CATEGORY', payload: categoryId });
                console.log(state.data);
                toast.success(response.message || "Category Delete Successfully!");
            } catch (error) {
                toast.error("Please first delete transactions related to this category!");
            }
        }
    };

    const openModal = () => {
        setShowModal(true);
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Budget',
            selector: row => row.budget,
            sortable: true
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true
        },
        {
            name: 'Delete',
            selector: 'delete',
            sortable: true,
            cell: (row) => (
                <FaTrash style={{cursor: "pointer"}} onClick={() => handleDeleteCategory(row.id)} />
            ),
        },
    ];

    return(
        <div className="container">
            <BudgetBar />

            <div className="d-flex justify-content-between">
                <h3>All Categories</h3>
                <button className="btn btn-success mb-1 align-self-end" onClick={openModal}>Add Category</button>
            </div>
            {
                loading ? (
                    <Loader />
                ) : (
                    state.data && 
                        <DataTable
                            className='transaction-table shadow'
                            columns={columns}
                            data={state.data}
                            pagination
                            striped
                            highlightOnHover
                        />
                    
                )
            }

            {showModal &&
                <CategoryModal showModal={showModal} setShowModal={setShowModal} handleAddCategory={handleAddCategory} />
            }
        </div>
    )
      
}

export default Categories;