import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { authState as auth } from './store/Auth.js';
import http from "./http-common";

// Validate token on app startup
const token = localStorage.getItem('token');

if (token) {
    http.get('/auth/validate-token')
        .then(() => {
            // Token is valid, do nothing
        })
        .catch(() => {
            auth.logout();
        });
}

createApp(App)
    .use(router)
    .mount('#app');
