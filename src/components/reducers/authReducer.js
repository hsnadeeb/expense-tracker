// authReducer.js
const initialState = {
    loggedIn: false,
    token: null,
    userId: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          loggedIn: true,
          token: action.payload.token,
          userId: action.payload.userId,
        };
      case 'LOGOUT':
        return {
          ...state,
          loggedIn: false,
          token: null,
          userId: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  