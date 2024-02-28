<template>
  <div class="header-container">
    <div class="logo">
      <router-link to="/"
        ><img
          src="/src/assets/logo/lof-logo.png"
          alt="Logo"
          style="height: 70px"
      /></router-link>
    </div>
    <nav class="main-nav">
      <ul v-if="!isConnected">
        <a href="#" @click="showLogin = true">Se connecter</a>
        <a href="#" @click="showRegister = true">S'inscrire</a>
      </ul>
      <ul
        v-else
        class="user-menu"
        @mouseover="dropdownVisible = true"
        @mouseleave="dropdownVisible = false"
      >
        <li>
          <a href="#">{{ accountName }}</a>
          <ul v-if="dropdownVisible" class="dropdown-menu">
            <li>
              <router-link to="/account" class="dropdown-text"
                >Compte</router-link
              >
            </li>
            <li>
              <router-link to="/leaderboard" class="dropdown-text"
                >Leaderboard</router-link
              >
            </li>
            <li>
              <a href="#" @click="logout" class="dropdown-text">Déconnexion</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>

  <transition name="fade">
    <div class="login-popup" v-if="showLogin">
      <div class="login-content">
        <button class="close-button" @click="close">X</button>
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
          <button class="custom-button" @click="registerUser" type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  </transition>

  <transition name="fade">
    <div class="register-popup" v-if="showRegister">
      <div class="register-content">
        <button class="close-button" @click="close">X</button>
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
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { api } from "@/plugins/requete.js";
import Overlay from "@/components/Overlay.vue";

export default {
  components: { Overlay },
  emits: ["isConnectedChange"],
  setup(props, { emit }) {
    const isConnected = ref(false);
    const showLogin = ref(false);
    const showRegister = ref(false);
    const username = ref("");
    const password = ref("");
    const mail = ref("");
    const token = ref(Cookies.get("token") || null);
    const accountName = ref("");
    const dropdownVisible = ref(false);
    const loginError = ref("");
    const registerError = ref("");

    const isLogged = async () => {
      if (token.value != null) {
        await api
          .get(`/users/?Token_User=${token.value}`)
          .then((response) => {
            if (response.data) {
              accountName.value = response.data[0]["Name_User"];
              isConnected.value = true;
            }
          })
          .catch((error) => {
            console.error(error);
            isConnected.value = false; // Ajustement pour isConnected
          });
      }
      emit("isConnectedChange", isConnected.value);
    };

    const close = () => {
      showLogin.value = false;
      showRegister.value = false;
    };

    const logout = () => {
      Cookies.remove("token");
      isConnected.value = false; // Inverser la logique pour isConnected
      dropdownVisible.value = false;
      location.reload();
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
          `/users/${username.value}/${mail.value}/${hashedPassword}/${tokenValue}/1`
        )
        .then(() => {
          Cookies.set("token", tokenValue, { expires: 7 });
          accountName.value = username.value;
          isConnected.value = true; // Ajustement pour isConnected
          close();
        })
        .catch((error) => {
          console.error(error);
          registerError.value =
            "Peut-être que le nom d'utilisateur ou l'email est déjà utilisé.";
        });
    };

    const registerUser = () => {
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
                isConnected.value = true; // Ajustement pour isConnected
                close();
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

    // Include the methods here using the same logic but referencing the ref values directly.

    return {
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
      registerUser,
      logout,
      close,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

.login-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #e3e3e3;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 15px;
  width: 30%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: -2px -1px 8px 0px #000000, 2px 1px 8px 0px rgba(0, 0, 0, 0.48);
}

ul {
  font-family: "Press Start 2P", cursive;
  font-size: 13px;
  letter-spacing: -1px;
  gap: 20px;
  text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black,
    2px 2px 0 black;
  /* Contours noirs */
}

.login-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close-button {
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-popup label {
  width: 100%;
  text-align: left;
  /* Aligns the label text to the left */
}

.login-content h2 {
  font-family: "Press Start 2P", cursive;
  color: #b8b8b8;
  /* Texte en blanc */
  text-align: center;
  margin-bottom: 50px;
  text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black,
    2px 2px 0 black;
  /* Contours noirs */
}

.login-popup label {
  color: #000;
  /* Ceci définit la couleur du texte en noir */
  text-align: center;
  font-family: "Press Start 2P", cursive;
  font-size: 15px;
  letter-spacing: -2px;
}

.login-popup input {
  color: #000;
  /* Ceci définit la couleur du texte en noir */
  text-align: center;
  font-family: "Press Start 2P", cursive;
  font-size: 13px;
  letter-spacing: -2px;
}

.login-popup input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.custom-button {
  font-family: "Press Start 2P", cursive;
  margin-top: 20px;
  width: 100%;
  background-color: #848484;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black,
    2px 2px 0 black;
  /* Contours noirs */
}

.custom-button:hover {
  color: #bd8630;
  background-color: #e5edf5;
  box-shadow: -2px -1px 8px 0px #000000, 2px 1px 8px 0px rgba(0, 0, 0, 0.48);
}

.register-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f0f0f0;
  /* Légère variation par rapport au login pour différencier */
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* Ombre plus prononcée pour le style */
  z-index: 1000;
  border-radius: 15px;
  width: 30%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-content h2 {
  font-family: "Press Start 2P", cursive;
  color: #b8b8b8;
  /* Texte en blanc */
  text-align: center;
  margin-bottom: 50px;
  text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black,
    2px 2px 0 black;
  /* Contours noirs */
}

.register-popup label {
  display: block;
  color: #000;
  text-align: center;
  font-family: "Press Start 2P", cursive;
  font-size: 15px;
  margin-bottom: 5px;
  /* Espacement avant le champ de saisie */
}

.register-popup input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  /* Plus d'espacement entre les champs */
  border: 2px solid #ccc;
  /* Bordure plus épaisse pour différencier */
  border-radius: 5px;
  font-family: "Press Start 2P", cursive;
  /* Maintient de la police pour la cohérence */
  font-size: 12px;
  /* Ajustement pour l'inscription */
  text-align: center;
}

.register-popup .custom-button {
  font-family: "Press Start 2P", cursive;
  margin-top: 25px;
  /* Espacement supérieur pour le bouton */
  width: 100%;
  background-color: #757575;
  /* Changement de couleur pour différencier */
  color: #fff;
  border: none;
  padding: 12px;
  /* Padding plus grand pour un meilleur visuel */
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-popup .custom-button:hover {
  color: #bd8630;
  background-color: #e5edf5;
  box-shadow: -2px -1px 8px 0px #000000, 2px 1px 8px 0px rgba(0, 0, 0, 0.48);
}

/* Styles spécifiques à l'en-tête */

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: rgba(91, 144, 179, 0.8);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.logo img {
  height: 60px;
  margin-top: 10px;
  /* Ajustez selon la taille de votre logo */
}

.main-nav {
  display: flex;
  align-items: center;
}

.main-nav ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.main-nav li {
  padding: 0 15px;
}

.main-nav a {
  text-decoration: none;
  color: white;
  padding: 5px;
}

input::placeholder {
  opacity: 0.5;
}

/*
MENU Deroulant
*/
.user-menu {
  position: relative; /* Établit un contexte de positionnement pour le menu déroulant */
}

/* Styles généraux pour le menu déroulant */
.dropdown-menu {
  display: block;
  position: absolute;
  background-color: #a62700;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 100%; /* Positionne le menu juste en dessous de l'élément parent */
  right: 0; /* Aligner le menu à la droite de l'élément parent */
  border-radius: 4px; /* Coins arrondis pour le menu */
  top: calc(100% + 5px);
}

.dropdown-menu li {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-menu li:hover {
  background-color: #cacaca;
}

/* Styles spécifiques au texte du menu déroulant pour la personnalisation */
.dropdown-text {
  font-size: 13px; /* Taille personnalisable */
  color: rgb(255, 0, 0); /* Couleur personnalisable */
  text-shadow: none; /* Ombre personnalisable */
  font-family: "Press Start 2P", cursive; /* Police personnalisable */
}

.user-menu li:hover .dropdown-menu {
  display: block;
}

.error-message {
  font-family: "Press Start 2P", cursive;
  font-size: 13px;
  color: red; /* Choisissez une couleur appropriée */
  margin-bottom: 10px; /* Ajustez l'espacement selon vos besoins */
  text-align: center; /* Centrez le message d'erreur */
}
</style>
