<template>
  <div id="home" class="flex flex-row flex-wrap justify-center pt-16 lg:gap-36">
    <Map v-if="isLogged" class="m-6" />
    <ScoreBoard
      :headers="playerHeaders"
      :listScore="playerListScore"
      class="m-6"
    />
    <ScoreBoard :headers="clanHeaders" :listScore="clanListScore" class="m-6" />
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

const playerListScore = ref([]);
const clanListScore = ref([]);

const playerHeaders = ref([
  { key: "index", label: "N°" },
  { key: "Name_User", label: "Pseudo" },
  { key: "maxScore", label: "Total points" },
]);

const clanHeaders = ref([
  { key: "index", label: "N°" },
  { key: "Title_Clan", label: "Nom du clan" },
  { key: "totalScore", label: "Total points" },
]);

async function getScores() {
  const response = await api.get(`/scores`);
  playerListScore.value = response.data;
  const response2 = await api.get("/clans/scores");
  clanListScore.value = response2.data;
}

onMounted(async () => {
  await getScores();
});
</script>
