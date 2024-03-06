<template>
  <div class="h-[100vh]">
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
    <Footer />
  </div>
</template>

<script>
import { ref, provide, computed } from "vue";
import HeaderNav from "./components/HeaderNav.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: { HeaderNav, Footer },
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
