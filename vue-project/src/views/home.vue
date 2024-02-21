<template>
    <div class="body">
        <HeaderNav />
        <div class="main-content">
            <section class="center-content">
                <h1>{{ welcomeText }}</h1>
                <p>Préparez-vous à défier les sommets de la Baraka avec nos héros.</p>
            </section>
        </div>
        <Footer />
    </div>
</template>
  
<script>
import HeaderNav from '@/components/HeaderNav.vue';
import Footer from '@/components/Footer.vue';

export default {
    data() {
        return {
            welcomeText: "",
            currentIndex: 0
        };
    },
    mounted() {
        this.typeText();
    },
    methods: {
        typeText() {
            const welcomeText = "Bienvenue dans l'aventure";
            if (this.currentIndex < welcomeText.length) {
                this.welcomeText += welcomeText[this.currentIndex];
                this.currentIndex++;
                setTimeout(this.typeText, 70); // Délai de 70 ms entre chaque lettre
            }
        }
    },
    components: { HeaderNav, HeaderNav, Footer, Footer }
};
</script>
  
<style>
/* Réinitialisation des styles de base */
body {
    margin: 0;
    padding: 0;
}

/* Styles globaux de la page */
body {
    font-family: 'Arial', sans-serif;
    background-image: url('@/assets/background.png');
    /* Ajoutez le chemin correct vers votre image de fond */
    background-size: cover;
    background-repeat: no-repeat;
    color: #fff;
    text-align: center;
    /* Centrer tout le contenu horizontalement */
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

.center-content h1,
.center-content p {
    font-family: 'Press Start 2P', cursive;
    /* Police personnalisée */
    text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black;
    /* Contours noirs */
}

/* Styles pour les boutons */
.button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 20px;
}

.button-container-char {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 20px;
}

/* Style pour les boutons personnalisés */
.custom-button {
    margin-top: 40px;
    width: 100%;
    background-color: #848484;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-decoration: none;
}

.custom-button:hover {
    color: #bd8630;
    background-color: #E5EDF5;
    box-shadow: -2px -1px 8px 0px #000000, 2px 1px 8px 0px rgba(0, 0, 0, 0.48);
}

.custom-button:active {
    box-shadow: none;
}


/* Styles pour le footer */
footer {
    text-align: center;
    padding: 10px 0;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
}

/* Styles spécifiques à l'en-tête */
.main-header {
    background: rgba(0, 0, 0, 0.4);
    /* Fond semi-transparent */
    color: white;
    padding: 10px 0;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
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
}

/* Vous pouvez supprimer le code du menu déroulant car il n'est plus utilisé */

/* Style pour le bouton du menu déroulant (peut également être supprimé si inutilisé) */
.dropbtn {
    background: none;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
}

/* Ajoutez de la marge à droite du lien "Se connecter" pour le séparer de "S'inscrire" */
.main-nav a[href="/login"] {
    margin-right: 30px;
    /* Ajustez la quantité de marge en fonction de vos préférences */
}

footer p {
    font-family: 'Press Start 2P', cursive;
    /* Police personnalisée */
    text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black;
    /* Contours noirs */
    letter-spacing: -2px;
    font-size: 14px;
}
</style>
