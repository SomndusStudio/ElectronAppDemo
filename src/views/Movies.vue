<template>
  <div>
    <h1 class="uk-heading"><span>Liste des films</span></h1>
    <button @click="loadMovies" class="uk-button uk-button-primary uk-margin-bottom">
      Appel API
    </button>

    <div v-if="loading" class="uk-text-center uk-margin">
      <div uk-spinner="ratio: 2"></div>
      <p>Chargement...</p>
    </div>

    <div v-if="error" class="uk-alert-danger" uk-alert>
      <p>{{ error }}</p>
    </div>

    <div v-if="movies.length" class="uk-grid-small uk-child-width-1-2@s uk-grid-match" uk-grid>
      <div v-for="movie in movies" :key="movie.title">
        <div class="uk-card uk-card-default uk-card-body">
          <h3 class="uk-card-title">{{ movie.title }}</h3>
          <p>{{ movie.description || 'Aucune description.' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import log from 'electron-log/renderer';

const loading = ref(false);
const error = ref(null);
const movies = ref([]);

async function loadMovies() {
  loading.value = true;
  error.value = null;
  movies.value = [];

  try {
    const res = await fetch('https://raw.githubusercontent.com/Chocolaterie/EniWebService/main/api/movies.json');

    log.info('[Films.vue] Requête envoyée à l’API');

    if (!res.ok) {
      const msg = `Réponse HTTP invalide : ${res.status}`;
      log.warn(`[Films.vue] ${msg}`);
      throw new Error(msg);
    }

    const data = await res.json();

    log.info(`[Films.vue] ${data.length} films reçus`);

    await new Promise(r => setTimeout(r, 1000));
    movies.value = data;
  } catch (err) {
    error.value = err.message;
    log.error('[Films.vue] Erreur lors du chargement des films :', err);
  } finally {
    loading.value = false;
    log.info('[Films.vue] Fin du chargement');
  }
}
</script>
