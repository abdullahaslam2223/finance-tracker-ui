const budgetReducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_DATA':
            return { data: action.payload }

        case 'ADD_TRANSACTION_IN_BUDGET':
            return {
                ...state,
                data: {
                    ...state.data,
                    amount: state.data.amount - action.payload
                }
            }

        default:
            return state;
    }
}

export default budgetReducer;