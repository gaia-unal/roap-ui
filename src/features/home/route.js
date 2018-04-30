import {
  Home,
  Login,
  Signin,
  UserList,
  UserValidate,
  CreateLearningObject,
  LearningObject,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: '/', name: 'Home', component: Home },
    { path: 'login', name: 'Login', component: Login },
    { path: 'signin', name: 'Signin', component: Signin },
    { path: 'user-list', name: 'User list', component: UserList },
    { path: 'user-validate/:token', name: 'User validate', component: UserValidate },
    { path: 'create-learning-object', name: 'Create learning object', component: CreateLearningObject },
    { path: 'learning-object/:fileName', name: 'Learning object', component: LearningObject },
  ],
};
