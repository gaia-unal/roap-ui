const initialState = {
  getLearningObjectListPending: false,
  getLearningObjectListError: null,
  learningObjectList: [],
  offset: 0,
  count: 15,
  page: 1,
  textSearch: null,
  user: null,
  loginUserPending: false,
  loginUserError: null,
  signinUserPending: false,
  signinUserError: null,
  userList: [],
  getUserListPending: false,
  getUserListError: null,
};

export default initialState;
