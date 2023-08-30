import { createContext, useReducer } from "react";
import transactionReducer from "../reducers/transactionReducer";

export const TransactionContext = createContext();

export const TransactionProvider = ( { children } ) => {
    const initialState = {
        data: []
    };

    const [state, dispatch] = useReducer(transactionReducer, initialState);

    return (
        <TransactionContext.Provider value={{ state, dispatch }}>
            {children}
        </TransactionContext.Provider>
    )
}