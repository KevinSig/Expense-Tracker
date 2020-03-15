// specify application state changes in responce to specific actions
// this is imported into globalstate
export default (state, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return{
        ...state, 
        loading: false, 
        transaction: action.payload 
      }

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transaction: state.transaction.filter(
          transaction => transaction._id !== action.payload //_id is how mongo db assigns id
        )
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transaction: [...state.transaction, action.payload]
      };

    case "GET_TRANSACTIONS_ERROR":
      return {
        ...state, 
        error: action.payload 
      }
    default:
      return state;
  }
};
