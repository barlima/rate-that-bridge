export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.user
      };
    case RESET_USER:
      return {};
    default:
      return state;
  }
};

export const setUser = user => ({
  type: SET_USER,
  user
})

export const resetUser = () => ({
  type: RESET_USER,
})