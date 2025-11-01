import { createApp } from 'vue';
import App from './App.vue';

import LoginScreen from '@views/Login.vue';
import { createRouter, createMemoryHistory } from 'vue-router';

const routes = [{ path: '/login', component: LoginScreen }];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
