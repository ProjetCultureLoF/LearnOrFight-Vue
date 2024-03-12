<template>
  <div id="home" class="flex flex-row flex-wrap justify-center pt-16 lg:gap-36">
    <Map v-if="isLogged" class="m-6" />
    <ScoreBoard :listScore="listScore" class="m-6" />
  </div>
</template>

<script setup>
import Map from "@/components/Map.vue";
import ScoreBoard from "@/components/ScoreBoard.vue";
import { ref, inject, computed, onMounted } from "vue";
import Clans from "@/components/Clans.vue";
import { api } from "@/plugins/requete";

const isLoggedRef = inject("isLogged");

const isLogged = computed(() => isLoggedRef.value);

const listScore = ref();

async function getScores() {
  const response = await api.get(`/scores`);
  listScore.value = response.data;
}

onMounted(async () => {
  await getScores();
  console.log(listScore.value);
});
</script>
