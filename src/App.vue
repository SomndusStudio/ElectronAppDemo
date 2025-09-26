<template>
  <div class="uk-container uk-margin-large-top">

    <!-- Onglets de navigation -->
    <ul class="uk-tab uk-flex-center">
      <li :class="{ 'uk-active': $route.path === '/' }">
        <router-link to="/">Accueil</router-link>
      </li>
      <li :class="{ 'uk-active': $route.path === '/movies' }">
        <router-link to="/movies">Movies</router-link>
      </li>
    </ul>

    <!-- Vue active -->
    <div class="uk-margin-top">
      <router-view />
    </div>
  </div>
</template>

<script setup>
// Rien besoin ici
</script>
