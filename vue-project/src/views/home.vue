<template>
  <div
    id="home"
    class="flex w-full place-self-center sm:flex-col md:flex-row flex-wrap items-center justify-center min-h-[80vh] pt-16"
  >
    <Map v-if="isLogged" class="m-6" />
    <div class="flex flex-col w-full md:w-1/2">
      <ScoreBoard
        :headers="playerHeaders"
        :listScore="playerListScore"
        :title="'Meilleurs joueurs'"
        class="m-6 self-center"
      />
      <button
        v-if="playerListScore.length > 0"
        @click="nextList"
        class="hover:bg-transparent bg-transparent w-fit relative left-[55%]"
      >
        <img src="/src/assets/icons/after.png" alt="" class="w-6" />
      </button>
      <button
        v-if="offset > 0"
        @click="lastList"
        class="hover:bg-transparent bg-transparent w-fit relative left-[40%]"
      >
        <img
          src="/src/assets/icons/before.png"
          alt=""
          class="w-6 duration-200"
        />
      </button>

      <ScoreBoard
        :headers="clanHeaders"
        :listScore="clanListScore"
        :title="'Meilleurs clans'"
        class="m-6 order-last self-center"
      />
    </div>
  </div>
</template>

<script setup>
import Map from "@/components/Map.vue";
import ScoreBoard from "@/components/ScoreBoard.vue";
import { ref, inject, computed, onMounted } from "vue";
import { api } from "@/plugins/requete";

const isLoggedRef = inject("isLogged");

const isLogged = computed(() => isLoggedRef.value);

const playerListScore = ref([]);
const clanListScore = ref([]);

const offset = ref(0);

const playerHeaders = ref([
  { key: "index", label: "N°" },
  { key: "Name_User", label: "Pseudo" },
  { key: "maxScore", label: "Total points" },
]);

const clanHeaders = ref([
  { key: "index", label: "N°" },
  { key: "Title_Clan", label: "Nom du clan" },
  { key: "totalScore", label: "Meilleur score" },
]);

async function getScores() {
  const response = await api.get(`/scores/?offset=${offset.value}`);
  playerListScore.value = response.data;
  console.log(offset.value);
}

async function nextList() {
  offset.value += 10;
  await getScores();
}

async function lastList() {
  offset.value -= 10;
  await getScores();
}

onMounted(async () => {
  await getScores();
  const response2 = await api.get("/clans/scores");
  clanListScore.value = response2.data;
});
</script>
