<template>
  <Verify
    v-if="showOverlay"
    :warning="''"
    @validate="changeUserData"
    @close="showOverlay = falsea"
  />

  <div
    class="flex md:flex-row xs:flex-col justify-center lg:items-start xs:items-center text-center mt-10"
  >
    <ScoreBoard
      :listScore="userScores"
      :title="'Vos scores'"
      :headers="headers"
      class="m-6"
    />

    <div
      class="flex flex-col items-center justify-center lg:w-2/5 xs:w-3/4 h-fit bg-white rounded gap-4 p-3 m-6 shadow-md"
    >
      <h1>Mon compte</h1>
      <div
        class="flex flex-row w-1/2 items-center justify-center gap-5 bg-white"
      >
        <input type="text" v-model="username" />
      </div>
      <div
        class="flex flex-row w-1/2 items-center justify-center gap-5 bg-white"
      >
        <input type="text" v-model="mail" />
      </div>
      <div
        class="flex flex-row w-1/2 items-center justify-center gap-5 bg-white"
      >
        <input type="text" v-model="newPassword" placeholder="*********" />
      </div>
      <button @click="validate">Modifier</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { api } from "@/plugins/requete.js";
import ScoreBoard from "@/components/ScoreBoard.vue";
import Verify from "@/components/Verify.vue";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const userData = ref(null);
const userScores = ref([]);
const clanListScore = ref([]);

const headers = ref([
  { key: "index", label: "N°" },
  { key: "User_Score", label: "Points" },
  { key: "Name_Department", label: "Département" },
  { key: "Theme_Department", label: "Thème" },
]);

const newPassword = ref("");
const mail = ref("");
const username = ref("");
const request = ref(null);

const showOverlay = ref(false);

async function getUserData() {
  const response = await api.get(`/users/?Token_User=${Cookies.get("token")}`);
  return response.data;
}

async function getUserScores(ID_User) {
  const response = await api.get(`/scores/${ID_User}`);
  console.log(response.data);
  return response.data;
}

function validate() {
  request.value = `/users/${userData.value.ID_User}/`;
  if (username.value != userData.value.Name_User) {
    request.value += `?Name_User=${username.value}&`;
  }
  if (mail.value != userData.value.Mail_User) {
    if (request[-1] == "&") {
      request.value += `Mail_User=${mail.value}&`;
    } else {
      request.value += `?Mail_User=${mail.value}&`;
    }
  }
  if (newPassword.value != "") {
    const password = CryptoJS.AES.encrypt(
      newPassword.value,
      "secretkey"
    ).toString();
    if (request[-1] == "&") {
      request.value += `Password_User=${password}`;
    } else {
      request.value += `?Password_User=${password}`;
    }
  }
  showOverlay.value = true;
}

async function changeUserData(ID_User) {
  const response = await api.patch(request.value);
  showOverlay.value = false;
  request.value = null;
}

onMounted(async () => {
  userData.value = await getUserData();
  userScores.value = await getUserScores(userData.value[0].ID_User);
  userData.value = userData.value[0];
  mail.value = userData.value.Mail_User;
  username.value = userData.value.Name_User;
});
</script>
