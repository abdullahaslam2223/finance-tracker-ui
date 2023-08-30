const categoryReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_CATEGORY':
        return { data: [action.payload, ...state.data] };
  
      case 'UPDATE_CATEGORY':
        return {
          data: state.data.map((category) =>
            category.id === action.payload.id ? action.payload : category
          ),
        };
  
      case 'DELETE_CATEGORY':
        return {
          data: state.data.filter((category) => category.id !== action.payload),
        };

      case 'FETCH_DATA_SUCCESS':
          return {
            data: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  