import {
  Home,
  Login,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'home', name: 'Home', component: Home },
    { path: 'login', name: 'Login', component: Login },
  ],
};
