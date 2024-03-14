<template>
  <div
    class="flex flex-row items-center justify-center text-center gap-10 mt-10"
  >
    <ScoreBoard :listScore="userScores" :headers="headers" />

    <div
      class="flex flex-col items-center justify-center w-2/3 h-fit bg-white rounded gap-4 p-3"
    >
      <h1>Mon compte</h1>
      <div
        class="flex flex-row w-1/2 items-center justify-center gap-5 bg-white"
      >
        <input type="text" v-model="username" />
        <button @click="changeUserData(username, 'Name_User')">Modifier</button>
      </div>
      <div
        class="flex flex-row w-1/2 items-center justify-center gap-5 bg-white"
      >
        <input type="text" v-model="mail" />
        <button @click="changeUserData(mail, 'Mail_User')">Modifier</button>
      </div>
      <div
        class="flex flex-row w-1/2 items-center justify-center gap-5 bg-white"
      >
        <input type="text" v-model="newPassword" placeholder="*********" />
        <button @click="changeUserData(newPassword, 'Password_User')">
          Modifier
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { api } from "@/plugins/requete.js";
import ScoreBoard from "@/components/ScoreBoard.vue";
import Cookies from "js-cookie";

const userData = ref(null);
const userScores = ref(null);
const headers = ref([
  { key: "index", label: "N°" },
  { key: "User_Score", label: "Points" },
]);

const newPassword = ref("");
const mail = ref("");
const username = ref("");

async function getUserData() {
  const response = await api.get(`/users/?Token_User=${Cookies.get("token")}`);
  return response.data;
}

async function getUserScores(ID_User) {
  const response = await api.get(`/scores/${ID_User}`);
  console.log(response.data);
  return response.data;
}

async function changeUserData(value, key) {
  const response = await api.patch(
    `/users/${userData.value.ID_User}/?${key}=${value}`
  );
}

onMounted(async () => {
  userData.value = await getUserData();
  userScores.value = await getUserScores(userData.value[0].ID_User);
  userData.value = userData.value[0];
  mail.value = userData.value.Mail_User;
  username.value = userData.value.Name_User;
});
</script>
