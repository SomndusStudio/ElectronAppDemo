import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Movies from '../views/Movies.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/movies', name: 'Movies', component: Movies }
];

const router = createRouter({
    history: createWebHashHistory(), // important pour Electron (pas d'historique HTML5)
    routes
});

export default router;
