<template>
  <div id="clan" style="background-color: green">
    <h1>{{ clan.name }}</h1>
    <img
      :src="`src/assets/logo/${clan.name}.png`"
      alt=""
      style="height: 150px"
    />
    <p>{{ clan.players }}</p>
    <p>{{ clan.score }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  clan: Object,
});
</script>
