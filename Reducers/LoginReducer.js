const LoginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.userID;

    case 'LOGOUT':
      return null;

    default:
      return state;
  }
};

export default LoginReducer;
