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
  userValidatePending: false,
  userValidateError: null,
  getLearningObjectMetadataSchemaPending: false,
  getLearningObjectMetadataSchemaError: null,
  learningObjectMetadataSchema: null,
};

export default initialState;
