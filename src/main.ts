import { createApp } from 'vue';
import HomePage from './App.vue';

import LoginScreen from '@views/Login.vue';
import { createRouter, createMemoryHistory } from 'vue-router';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginScreen },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const app = createApp(HomePage);
app.use(router);
app.mount('#app');
