<template>
  <div id="home">
    <Map v-if="isLogged" />
    <ScoreBoard />
  </div>
</template>

<script>
import Map from "@/components/Map.vue";
import ScoreBoard from "@/components/ScoreBoard.vue";
import { ref, inject, computed } from "vue";
import Clans from "@/components/Clans.vue";

export default {
  components: { Map, ScoreBoard, Clans },
  setup() {
    const isLoggedRef = inject("isLogged");

    const isLogged = computed(() => isLoggedRef.value);

    return { isLogged };
  },
};
</script>

<style>
/* Réinitialisation des styles de base */
body {
  margin: 0;
  padding: 0;
}
#home {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
