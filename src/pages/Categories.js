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
import '../styles/data-table.css';

function Categories() {
    const { token } = useContext(AuthContext);
    const headers = getTokenHeader(token);
    const { state, dispatch } = useContext(CategoryContext);

    const [categoryData, setCategoryData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleAddCategory = async (newCategory) => {
        try {
          const addedCategory = await addCategory(newCategory);
          dispatch({ type: 'ADD_CATEGORY', payload: addedCategory });
        } catch (error) {
          // Handle the error
        }
    };

    const getAllCategories = () => {
        setLoading(true);
        axios.get(API_BASE_URL + 'category', { headers: headers }).then(response => {
            const res = response.data;
            setLoading(false);
            setCategoryData(res.data);
        }).catch(error => {
            // const res = error.response.data;
            setLoading(false);
            toast.error("Something went wrong!");
        });
    }

    const handleDeleteCategory = async (categoryId) => {
        console.log("cate");
        try {
          await deleteCategory(categoryId, headers);
          dispatch({ type: 'DELETE_CATEGORY', payload: categoryId });
        } catch (error) {
          // Handle the error
        }
    };

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
        <div>
            <h1 className="text-center">All Categories</h1>
            {
                loading ? (
                    <Loader />
                ) : (
                    categoryData && 
                        <DataTable
                            className='transaction-table shadow'
                            columns={columns}
                            data={categoryData}
                            pagination
                            striped
                            highlightOnHover
                        />
                    
                )
            }
        </div>
    )
      
}

export default Categories;