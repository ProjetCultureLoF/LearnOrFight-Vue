<template>
  <Overlay />
  <transition name="fade">
    <div
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 pb-8 shadow-lg rounded-lg w-2/6 min-w-max h-fill flex flex-col text-center items-center z-50 gap-7"
    >
      <img
        src="/src/assets/icons/clair.png"
        class="self-end w-8 hover:w-10 duration-200"
        @click="$emit('close')"
      />
      <h2>Validez votre mot de passe</h2>
      <h4 class="text-red-600">{{ warning }}</h4>
      <form @submit.prevent="login" class="flex flex-col gap-5">
        <div class="flex flex-col gap-5">
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Mot de passe"
          />
        </div>
        <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>
        <button class="bg-[#a76a30]" @click="verifyUser" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Overlay from "@/components/Overlay.vue";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { api } from "@/plugins/requete";

const emit = defineEmits(["validate", "close"]);

const props = defineProps({
  warning: String,
});

const password = ref("");
const errorMessage = ref("");

const userData = ref();
const token = ref(Cookies.get("token") || null);

async function verifyUser() {
  const salt = "your-salt-string";
  const hashedPassword = CryptoJS.PBKDF2(password.value, salt, {
    keySize: 512 / 32,
    iterations: 1000,
  }).toString();

  if (hashedPassword == userData.value.Password_User) {
    emit("validate", userData.value.ID_User);
    errorMessage.value = "";
  } else {
    console.log(hashedPassword == userData.Password_User);
    console.log(userData.value);
    errorMessage.value = "Mot de passe incorrect";
  }
}

onMounted(async () => {
  const response = await api.get("/users/?Token_User=" + token.value);
  userData.value = response.data[0];
});
</script>
