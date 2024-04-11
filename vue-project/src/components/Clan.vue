<template>
  <Verify
    v-if="showOverlay"
    @validate="changeUserClan"
    @close="showOverlay = false"
    :warning="'Attention, changer de clan effacera tous vos scores'"
  />
  <div
    id="clan"
    class="flex flex-col flex-wrap w-1/3 items-center justify-center gap-4"
  >
    <h1 class="">{{ clan.Title_Clan }}</h1>
    <img
      :src="`src/assets/logo/${clan.Title_Clan}.png`"
      alt=""
      class="h-[15vh] w-[15vh]"
    />
    <button class="p-2" @click="showOverlay = true">Choisir ce clan</button>
    <ScoreBoard
      :title="'Meilleurs joueurs'"
      :headers="headers"
      :listScore="userScore"
    />
  </div>
</template>

<script setup>
import ScoreBoard from "./ScoreBoard.vue";
import Verify from "./Verify.vue";
import { ref, onMounted } from "vue";
import { api } from "@/plugins/requete";

const userScore = ref();
const showOverlay = ref(false);
const headers = ref([
  { key: "index", label: "N°" },
  { key: "Name_User", label: "Pseudo" },
  { key: "maxScore", label: "Total points" },
]);

const props = defineProps({
  clan: Object,
});

async function changeUserClan(ID_User) {
  const response = await api.patch(
    `/users/${ID_User}/?clanIDClan=${props.clan.ID_Clan}`
  );
  console.log(response.data);
  showOverlay.value = false;
  window.location.reload();
}

onMounted(async () => {
  const response = await api.get(`/scores/?clanIDClan=${props.clan.ID_Clan}`);
  userScore.value = response.data;
  console.log(userScore.value);
});
</script>
