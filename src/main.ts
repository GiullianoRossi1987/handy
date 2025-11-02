import { createApp } from 'vue';
import HomePage from './App.vue';
import LoginScreen from '@views/Login.vue';
import ScheduledJobs from '@views/ScheduledJobs.vue';
import WorkerAccount from '@views/Account.vue';

import { createRouter, createMemoryHistory } from 'vue-router';
import '@fortawesome/fontawesome-free/css/all.css';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginScreen },
  { path: '/account/schedule', component: ScheduledJobs },
  { path: '/account', component: WorkerAccount },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const app = createApp(HomePage);
app.use(router);
app.mount('#app');
