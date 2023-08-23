const categoryReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_CATEGORY':
        return { ...state, data: [...state.data, action.payload] };
  
      case 'UPDATE_CATEGORY':
        return {
          ...state,
          data: state.data.map((category) =>
            category.id === action.payload.id ? action.payload : category
          ),
        };
  
      case 'DELETE_CATEGORY':
        return {
          ...state,
          data: state.data.filter((category) => category.id !== action.payload),
        };
  
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  