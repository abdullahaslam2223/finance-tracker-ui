import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../App";
import { getTokenHeader } from "../utils/common";
import axios from "axios";
import { API_BASE_URL } from "../utils/config";
import { toast } from "react-toastify";

function Categories() {
    const { token } = useContext(AuthContext);
    const headers = getTokenHeader(token);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        getAllCategories();
    }, [])

    const getAllCategories = () => {
        // setLoading(true);
        axios.get(API_BASE_URL + 'category', { headers: headers }).then(response => {
            const res = response.data;
            // setLoading(false);
            setCategories(res.data);
        }).catch(error => {
            // const res = error.response.data;
            // setLoading(false);
            toast.error("Something went wrong!");
        });
    }

    console.log(categories);

    return(
            categories && categories?.map((category) => (
                <>
                    <div key={category.id}>{category.name}</div>
                    <div key={category.id}>{category.budget}</div>
                    <div key={category.id}>{category.description}</div>
                </>
            ))
    )
}

export default Categories;