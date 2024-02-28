<template>
  <div id="home">
    <Map />
    <ScoreBoard />
  </div>
</template>

<script>
import Map from "@/components/Map.vue";
import ScoreBoard from "@/components/ScoreBoard.vue";

export default {
  components: { Map, ScoreBoard },
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
