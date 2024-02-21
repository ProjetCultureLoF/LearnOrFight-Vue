import { createApp } from 'vue';

import router from './router'; // Importez votre configuration du routeur
import api from './plugins/requete.js';
import App from './App.vue'

createApp(App)
    .use(router)
    .use(api)
    .mount('#app')
