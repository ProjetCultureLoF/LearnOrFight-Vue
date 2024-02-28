<template>
  <Clan v-for="(clan, index) in clans" :key="index" class="clan" :clan="clan" />
</template>

<script setup>
import Clan from "@/components/Clan.vue";
import { ref } from "vue";
const clans = ref([
  { name: "twitch", players: 1000, score: 127012 },
  { name: "youtube", players: 1000, score: 127012 },
]);
</script>

<style scoped></style>
