<template>
  <div
    class="flex flex-row justify-between items-center p-2 bg-[#a76a30] shadow-lg w-full"
  >
    <router-link to="/" class="mt-2">
      <img class="h-20" src="/src/assets/logo/lof-logo.png" alt="Logo" />
    </router-link>
    <router-link to="/admin" v-if="isAdmin" class="text-white"
      >Créer quizz</router-link
    >

    <nav class="m-4">
      <ul v-if="!isConnected" class="flex gap-4">
        <a href="#" @click="showLogin = true" class="text-white"
          >Se connecter</a
        >
        <a href="#" @click="showRegister = true" class="text-white"
          >S'inscrire</a
        >
      </ul>
      <ul
        v-else
        class="relative"
        @mouseover="dropdownVisible = true"
        @mouseleave="dropdownVisible = false"
      >
        <li class="list-none">
          <a href="#" class="text-white font-serif">{{ accountName }}</a>
          <ul
            v-if="dropdownVisible"
            class="absolute bg-[#BF6415] min-w-max shadow-lg z-10 right-0 rounded-md top-full"
          >
            <li>
              <router-link
                to="/account"
                class="dropdown-text rounded-md block px-4 py-3 text-red-100 duration-100 hover:font-bold hover:shadow"
                >Compte</router-link
              >
            </li>
            <li>
              <router-link
                to="/leaderboard"
                class="dropdown-text block px-4 py-3 text-red-100 duration-100 hover:font-bold hover:shadow"
                >Leaderboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/"
                @click="logout"
                class="dropdown-text rounded-md block px-4 py-3 text-red-100 duration-100 hover:font-bold hover:shadow"
                >Déconnexion</router-link
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
  <transition name="fade">
    <div
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 pb-8 shadow-lg rounded-lg w-2/6 min-w-max h-fill flex flex-col text-center items-center z-50 gap-7"
      v-if="showLogin"
    >
      <img
        src="/src/assets/icons/clair.png"
        class="self-end w-8 hover:w-10 duration-200"
        @click="close"
      />
      <h2>On s'est déjà vu?</h2>
      <form @submit.prevent="login" class="flex flex-col gap-5">
        <div class="flex flex-col gap-5">
          <input
            id="username"
            v-model="username"
            type="text"
            required
            placeholder="Nom d'utilisateur"
          />
        </div>
        <div class="flex flex-col gap-5">
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Mot de passe"
          />
        </div>
        <div v-if="loginError" class="error-message">{{ loginError }}</div>
        <button class="bg-[#a76a30]" @click="logginUser" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  </transition>

  <!-- Inscription -->
  <transition name="fade">
    <div
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 shadow-lg rounded-lg w-2/5 min-w-max h-fill flex flex-col text-center items-center z-50 gap-7"
      v-if="showRegister"
    >
      <img
        src="/src/assets/icons/clair.png"
        class="self-end w-8 hover:w-10 duration-200"
        @click="close"
      />
      <h2>Première visite ?</h2>
      <form @submit.prevent="register" class="flex flex-col gap-5">
        <input
          id="reg-username"
          v-model="username"
          type="text"
          required
          placeholder="Nom d'utilisateur"
        />

        <input
          id="reg-email"
          v-model="mail"
          type="email"
          placeholder="mail@exemple.com"
          required
        />
        <input
          id="reg-password"
          v-model="password"
          type="password"
          required
          placeholder="Mot de passe"
        />
        <div v-if="registerError" class="error-message">
          {{ registerError }}
        </div>
        <button class="custom-button" type="submit">S'inscrire</button>
      </form>
    </div>
  </transition>
  <Overlay v-if="showLogin || showRegister" />
</template>

<script>
import { ref, onMounted, computed } from "vue";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { api } from "@/plugins/requete.js";
import Overlay from "@/components/Overlay.vue";
import router from "@/router";
export default {
  components: { Overlay },
  emits: ["isConnectedChange"],
  setup(props, { emit }) {
    const isConnected = ref(false);
    const showLogin = ref(false);
    const showRegister = ref(false);
    const isAdmin = ref(false);

    const username = ref("");
    const password = ref("");
    const mail = ref("");
    const token = ref(Cookies.get("token") || null);
    const accountName = ref("");
    const dropdownVisible = ref(false);
    const loginError = ref("");
    const registerError = ref("");

    const isConnectedComp = computed(() => {
      return isConnected.value;
    });

    const isLogged = async () => {
      if (token.value != null) {
        await api
          .get(`/users/?Token_User=${token.value}`)
          .then((response) => {
            if (response.data.length > 0) {
              console.log("Utilisateur: ", response.data);
              accountName.value = response.data[0]["Name_User"];
              isConnected.value = true;
              isAdmin.value = response.data[0]["isAdmin"];
            } else {
              router.push("/");
            }
          })
          .catch((error) => {
            console.error(error);
            isConnected.value = false;
          });
      } else {
        router.push("/");
      }
      emit("isConnectedChange", isConnectedComp.value);
    };

    const close = () => {
      showLogin.value = false;
      showRegister.value = false;
    };

    const logout = () => {
      Cookies.remove("token");
      isConnected.value = false;
      dropdownVisible.value = false;
      isAdmin.value = false;
      emit("isConnectedChange", isConnectedComp.value);
    };

    const register = () => {
      const tokenValue = CryptoJS.lib.WordArray.random(128 / 8).toString();
      const salt = "your-salt-string";
      const hashedPassword = CryptoJS.PBKDF2(password.value, salt, {
        keySize: 512 / 32,
        iterations: 1000,
      }).toString();

      api
        .post(
          `/users/${username.value}/${mail.value}/${hashedPassword}/${tokenValue}/1/2`
        )
        .then(() => {
          Cookies.set("token", tokenValue, { expires: 7 });
          accountName.value = username.value;
          isConnected.value = true;
          close();
          emit("isConnectedChange", isConnected.value);
        })
        .catch((error) => {
          console.error(error);
          registerError.value =
            "Peut-être que le nom d'utilisateur ou l'email est déjà utilisé.";
        });
    };

    const logginUser = () => {
      const salt = "your-salt-string";
      const hashedPassword = CryptoJS.PBKDF2(password.value, salt, {
        keySize: 512 / 32,
        iterations: 1000,
      }).toString();

      api
        .get(
          `/users/?Name_User=${username.value}&Password_User=${hashedPassword}`
        )
        .then((response) => {
          if (response.data != null) {
            const player = response.data[0];
            const tokenValue = CryptoJS.lib.WordArray.random(
              128 / 8
            ).toString();
            api
              .patch(`/users/${player.ID_User}?Token_User=${tokenValue}`)
              .then(() => {
                Cookies.set("token", tokenValue, { expires: "" });
                isConnected.value = true;
                accountName.value = response.data[0]["Name_User"];
                close();
                isAdmin.value = response.data[0]["isAdmin"];
                emit("isConnectedChange", isConnectedComp.value);
              })
              .catch((error) => console.log(error));
          } else {
            loginError.value = "Nom d'utilisateur ou mot de passe incorrect.";
          }
        })
        .catch((error) => {
          console.error(error);
          loginError.value =
            "Erreur lors de la tentative de connexion. Veuillez réessayer.";
        });
    };

    onMounted(() => {
      isLogged();
    });

    return {
      isAdmin,
      isConnected,
      showLogin,
      showRegister,
      username,
      password,
      mail,
      token,
      accountName,
      dropdownVisible,
      loginError,
      registerError,
      register,
      logginUser,
      logout,
      close,
    };
  },
};
</script>
