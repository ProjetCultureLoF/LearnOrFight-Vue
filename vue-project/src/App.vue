<template>
  <HeaderNav @isConnectedChange="(newValue) => (sendIsLogged = newValue)" />
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <KeepAlive>
        <Suspense>
          <!-- main content -->
          <component :is="Component"></component>

          <!-- loading state -->
          <template #fallback> Loading... </template>
        </Suspense>
      </KeepAlive>
    </template>
  </RouterView>
</template>

<script>
import { ref, provide, computed } from "vue";
import HeaderNav from "./components/HeaderNav.vue";

export default {
  name: "App",
  components: { HeaderNav },
  setup() {
    const isLogged = ref(false);
    const sendIsLogged = computed({
      get() {
        console.log("isLogged: ", isLogged.value);
        return isLogged.value;
      },
      set(newValue) {
        isLogged.value = newValue;
      },
    });
    provide("isLogged", sendIsLogged);

    return {
      isLogged,
      sendIsLogged,
    };
  },
};
</script>

<style></style>
