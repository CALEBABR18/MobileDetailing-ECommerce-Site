<template>
  <AppNavbar />
  <div id="app-content">
    <router-view/>
  </div>
  <AppFooter />
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';
export default {
  components: { AppNavbar, AppFooter }
}
</script>

<style>
#app {
  font-family: "Playfair Display", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app-content {
  margin-top: 90px; 
}
</style>
