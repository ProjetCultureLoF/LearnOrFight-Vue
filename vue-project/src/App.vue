<template>
  <HeaderNav />
  <router-view />
</template>

<script lang="js">
import HeaderNav from './components/HeaderNav.vue';
export default {
  name: 'App',
  components:{HeaderNav}
}
</script>

<style></style>
