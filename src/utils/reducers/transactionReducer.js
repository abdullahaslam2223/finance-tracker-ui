const transactionReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TRANSACTION':
            return { data: [action.payload, ...state.data] };
        
        case 'DELETE_TRANSACTION':
            return { 
                data: state.data.filter((transaction) => transaction.id !== action.payload)
            };
        
        case 'FETCH_DATA':
            return { data: action.payload }

        default:
            return state;
    }
}

export default transactionReducer;