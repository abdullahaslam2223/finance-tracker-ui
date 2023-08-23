import { createContext, useContext, useReducer } from 'react';
import categoryReducer from '../reducers/categoryReducer';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
        const initialState = {
        success: true,
        data: [],
        message: 'Categories retrieved successfully.',
    };

    const [state, dispatch] = useReducer(categoryReducer, initialState);

    return (
        <CategoryContext.Provider value={{ state, dispatch }}>
        {children}
        </CategoryContext.Provider>
    );
};
