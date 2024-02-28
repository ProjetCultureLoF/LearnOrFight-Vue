<template>
  <HeaderNav @isConnectedChange="sendIsLogged" />
  <router-view />
</template>

<script>
import { ref, provide } from "vue";
import HeaderNav from "./components/HeaderNav.vue";

export default {
  name: "App",
  components: { HeaderNav },
  setup() {
    const isLogged = ref(false);
    const sendIsLogged = (newIsLogged) => {
      isLogged.value = newIsLogged;
    };
    provide("isLogged", isLogged);

    return {
      isLogged,
      sendIsLogged,
    };
  },
};
</script>

<style></style>
