import {
  Home,
  Login,
  Signin,
  UserList,
  UserValidate,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'home', name: 'Home', component: Home },
    { path: 'login', name: 'Login', component: Login },
    { path: 'signin', name: 'Signin', component: Signin },
    { path: 'user-list', name: 'User list', component: UserList },
    { path: 'user-validate/:token', name: 'User validate', component: UserValidate },
  ],
};
