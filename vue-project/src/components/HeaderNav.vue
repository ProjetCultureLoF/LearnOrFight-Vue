<template>
  <div
    class="flex flex-row items-center p-2 bg-[#273445] shadow-lg w-[100vw] xl:max-h-24 lg:max-h-18 xs:max-h-18"
  >
    <div class="flex flex-row bg-inherit w-[100vw] items-center">
      <router-link to="/" class="mt-2">
        <img
          class="h-20 hover:md:h-[5.5rem] duration-200"
          src="/src/assets/logo/lof-logo.png"
          alt="Logo"
        />
      </router-link>
      <div class="bg-transparent flex gap-10 items-center justify-center pl-10">
        <router-link
          to="/clans"
          v-if="isConnected"
          class="text-white relative inline cursor-pointer text-xl font-medium before:bg-white before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"
        >
          Clans</router-link
        >
        <router-link
          :to="'/admin/' + token"
          v-if="isAdmin"
          class="text-white relative inline cursor-pointer text-xl font-medium before:bg-white before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"
          >Créer quizz</router-link
        >
      </div>
    </div>

    <nav class="m-4 items-center">
      <ul v-if="!isConnected" class="flex gap-10 items-center">
        <a
          href="#"
          @click="showLogin = true"
          class="text-white hover:text-black duration-200 text-nowrap"
          >Se connecter</a
        >
        <a
          href="#"
          @click="showRegister = true"
          class="text-white hover:text-black duration-200"
          >S'inscrire</a
        >
      </ul>
      <ul
        v-else
        class="relative"
        @mouseover="dropdownVisible = true"
        @mouseleave="dropdownVisible = false"
      >
        <li class="list-none flex flex-row items-center gap-2">
          <a
            href="#"
            class="font-serif duration-200 text-white"
            :class="{
              '': dropdownVisible == true,
            }"
            >{{ accountName }}</a
          >
          <img
            src="/src/assets/icons/down_arrow.png"
            alt=""
            class="h-4 duration-200"
            :class="{
              'rotate-0 text-shadow-lg shadow-white': dropdownVisible == true,
              'rotate-180': dropdownVisible == false,
            }"
          />
          <ul
            v-if="dropdownVisible"
            class="absolute bg-[#273445] min-w-max shadow-lg z-10 right-0 rounded-md top-full"
          >
            <li>
              <router-link
                to="/account"
                class="dropdown-text rounded-md block px-4 py-3 text-white duration-100 hover:font-bold hover:shadow"
                >Compte</router-link
              >
            </li>
            <li>
              <router-link
                to="/"
                @click="logout"
                class="dropdown-text rounded-md block px-4 py-3 text-white duration-100 hover:font-bold hover:shadow"
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
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 pb-8 shadow-lg rounded-lg md:w-2/6 xs:w-4/6 min-w-max h-fill flex flex-col text-center items-center z-50 gap-7"
      v-if="showLogin"
    >
      <img
        src="/src/assets/icons/clair.png"
        class="self-end md:w-8 xs:w-5 hover:w-10 duration-200"
        style="cursor: pointer"
        @click="close"
      />
      <h2>On s'est déjà vu?</h2>
      <form @submit.prevent="login" class="flex flex-col gap-5 items-center">
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
        <p v-if="loginError" class="break-all">{{ loginError }}</p>

        <button class="bg-[#273445]" @click="logginUser" type="submit">
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
      <div class="flex flex-col text-center items-center z-50 gap-7">
        <h2>Première visite ?</h2>
        <form
          @submit.prevent="register"
          class="flex flex-col gap-5 items-center"
        >
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
      <!-- <div v-else>
        <Clans></Clans>
      </div> -->
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
import Clans from "@/components/Clans.vue";
import { useRouter } from "vue-router";

export default {
  components: { Overlay, Clans },
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
    // const registerPhase = ref(true);
    const router = useRouter();

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
          `/users/${username.value}/${mail.value}/${hashedPassword}/${tokenValue}/false/2`
        )
        .then(() => {
          Cookies.set("token", tokenValue, { expires: 7 });
          accountName.value = username.value;
          isConnected.value = true;
          // registerPhase.value = false;
          close();
          emit("isConnectedChange", isConnected.value);
          router.push("/clans");
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
                token.value = tokenValue;
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
          loginError.value = "Erreur lors de la tentative de connexion.";
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
      // registerPhase,
      register,
      logginUser,
      logout,
      close,
    };
  },
};
</script>
