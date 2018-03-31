import {
  Home,
  Login,
  Signin,
  UserList,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'home', name: 'Home', component: Home },
    { path: 'login', name: 'Login', component: Login },
    { path: 'signin', name: 'Signin', component: Signin },
    { path: 'user-list', name: 'User list', component: UserList },
  ],
};
