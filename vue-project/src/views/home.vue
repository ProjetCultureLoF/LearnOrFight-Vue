<template>
  <div class="body">
    <div class="main-content">
      <section class="center-content">
        <h1>{{ welcomeText }}</h1>
        <h1>{{ user.name }}</h1>
        <input type="text" v-model="userName" />
        <button @click="inputed"></button>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue";
import Footer from "@/components/Footer.vue";
import store from "@/plugins/store";

export default {
  data() {
    return {
      welcomeText: "",
      currentIndex: 0,
      userName: "",
    };
  },
  mounted() {
    this.typeText();
  },
  methods: {
    typeText() {
      const welcomeText = "Bienvenue dans Learn or Fight";
      if (this.currentIndex < welcomeText.length) {
        this.welcomeText += welcomeText[this.currentIndex];
        this.currentIndex++;
        setTimeout(this.typeText, 70); // Délai de 70 ms entre chaque lettre
      }
    },
    inputed() {
      this.user.name = this.userName;
      this.$store.commit("setUser", this.user);
      console.log(store.state.user);
    },
  },
  computed: {
    user() {
      return store.state.user;
    },
    game() {
      return store.state.game;
    },
    level() {
      return store.state.level;
    },
    popup() {
      return store.state.popup;
    },
  },
  components: { HeaderNav, HeaderNav, Footer, Footer },
};
</script>

<style>
/* Réinitialisation des styles de base */
body {
  margin: 0;
  padding: 0;
}

/* Conteneur principal de la page */
.main-content {
  padding: 20px;
}

/* Styles pour la section d'introduction */
.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

h1 {
  margin-top: 40px;
}
</style>
