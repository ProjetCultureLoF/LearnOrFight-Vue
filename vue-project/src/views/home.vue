<template>
  <div id="home">
    <Map v-if="isLogged" />
    <ScoreBoard />
    <Clans />
  </div>
</template>

<script>
import Map from "@/components/Map.vue";
import ScoreBoard from "@/components/ScoreBoard.vue";
import { ref, inject } from "vue";
import Clans from "@/components/Clans.vue";

export default {
  components: { Map, ScoreBoard, Clans },
  setup() {
    const isLogged = inject("isLogged");
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
