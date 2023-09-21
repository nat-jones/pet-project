export const login = (userID) => {
  return {
    type: 'LOGIN',
    userID: userID,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};
