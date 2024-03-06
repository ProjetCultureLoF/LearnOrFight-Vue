<template>
  <div
    class="flex flex-row justify-between items-center p-2 bg-[#5b90b3cc] shadow-md"
  >
    <router-link to="/" class="mt-2">
      <img class="h-20" src="/src/assets/logo/lof-logo.png" alt="Logo" />
    </router-link>
    <router-link to="/admin" v-if="isAdmin" class="text-white"
      >Créer quizz</router-link
    >

    <nav class="main-nav">
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
        class="user-menu relative"
        @mouseover="dropdownVisible = true"
        @mouseleave="dropdownVisible = false"
      >
        <li class="list-none">
          <a href="#" class="text-white font-serif">{{ accountName }}</a>
          <ul
            v-if="dropdownVisible"
            class="dropdown-menu absolute bg-[#5c2cae] min-w-max shadow-lg z-10 right-0 rounded-md top-full"
          >
            <li>
              <router-link
                to="/account"
                class="dropdown-text rounded-md block px-4 py-3 text-red-100 hover:bg-[#481e90]"
                >Compte</router-link
              >
            </li>
            <li>
              <router-link
                to="/leaderboard"
                class="dropdown-text block px-4 py-3 text-red-100 hover:bg-[#481e90]"
                >Leaderboard</router-link
              >
            </li>
            <li>
              <router-link
                to="/"
                @click="logout"
                class="dropdown-text block px-4 py-3 rounded-md text-red-100 hover:bg-[#481e90]"
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
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-10 shadow-lg rounded-lg w-1/3 min-w-max flex flex-col items-center z-50"
      v-if="showLogin"
    >
      <div class="login-content">
        <button class="close-button self-end text-2xl" @click="close">X</button>
        <h2>On s'est déjà vu?</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">Nom d'utilisateur:</label>
            <input id="username" v-model="username" type="text" required />
          </div>
          <div class="form-group">
            <label for="password">Mot de passe:</label>
            <input id="password" v-model="password" type="password" required />
          </div>
          <div v-if="loginError" class="error-message">{{ loginError }}</div>
          <button class="custom-button" @click="logginUser" type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  </transition>

  <!-- Inscription -->
  <transition name="fade">
    <div
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-10 shadow-md rounded-lg w-1/3 min-w-max flex flex-col items-center z-50"
      v-if="showRegister"
    >
      <div class="register-content">
        <button class="close-button self-end text-2xl" @click="close">X</button>
        <h2>Première visite ?</h2>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="reg-username">Nom d'utilisateur:</label>
            <input id="reg-username" v-model="username" type="text" required />
          </div>
          <div class="form-group">
            <label for="reg-email">Email:</label>
            <input
              id="reg-email"
              v-model="mail"
              type="email"
              placeholder="mail@exemple.com"
              required
            />
          </div>
          <div class="form-group">
            <label for="reg-password">Mot de passe:</label>
            <input
              id="reg-password"
              v-model="password"
              type="password"
              required
            />
          </div>
          <div v-if="registerError" class="error-message">
            {{ registerError }}
          </div>
          <button class="custom-button" type="submit">S'inscrire</button>
        </form>
      </div>
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
          `/users/${username.value}/${mail.value}/${hashedPassword}/${tokenValue}/1/1`
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
