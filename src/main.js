import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

store.dispatch("user/onAuthChange");

library.add(faStar);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store).use(router).use(Toast);
app.mount('#app');
