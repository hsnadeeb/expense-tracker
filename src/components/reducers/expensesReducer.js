// expensesReducer.js
const initialState = {
    expenses: [],
    totalAmount: 0,
    premiumActivated: false,
  };
  
  const expensesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_EXPENSES':
        return {
          ...state,
          expenses: action.payload.expenses,
          totalAmount: action.payload.totalAmount,
          premiumActivated: action.payload.totalAmount > 10000,
        };
      default:
        return state;
    }
  };
  
  export default expensesReducer;
  