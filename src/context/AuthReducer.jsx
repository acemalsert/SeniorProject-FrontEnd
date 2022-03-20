const AuthReducer = (state, action) => {
    switch (action.type) {
      case "ADD_USER":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
      default:
        return state;
    }
  };
  
  export default AuthReducer;