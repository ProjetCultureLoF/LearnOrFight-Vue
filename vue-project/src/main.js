import { createApp } from 'vue';

import router from './router'; 
import api from './plugins/requete.js';
import store from './plugins/store.js';
import App from './App.vue';
import '@/assets/style.css'
createApp(App)
    .use(router)
    .use(api)
    .use(store)
    .mount('#app')
