<template>
  <div class="registerPage">
    <div class="register">
      <!--Titre d'enregistrement et login-->
      <div class="title">
        <h1 v-if="mode == 'loginAccount'">Connexion</h1>
        <h1 v-else>Inscription</h1>
      </div>

      <!--Lien d'acces au mode d'enregistrement et login-->
      <p v-if="mode == 'loginAccount'" class="createNote">
        Vous n'avez pas de compte ?
        <span @click="linkToCreateAccount()">Creer un compte</span>
      </p>
      <p v-else class="loginNote">
        Vous avez déjà un compte ?
        <span @click="linkToLoginAccount()">Se connecter</span>
      </p>

      <!--Champs d'enregistrement et de login-->
      <form class="loginContent">
        <input
          v-model="username"
          type="text"
          placeholder="Identifiant"
          id="identifiant"
        />
        <br />
        <div v-if="mode == 'createAccount'">
          <input v-model="email" type="email" placeholder="Email" id="email" />
        </div>
        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          id="password"
        />
        <br />
      </form>

      <!--bouton d'enregistrement et de login-->
      <div id="btnRegister">
        <button @click="btnLogin()" v-if="mode == 'loginAccount'">
          Valider
        </button>
        <button @click="btnCreate()" v-else>Enregistrer</button>
        <p v-if="mode == 'loginAccount'" class="createNote">
          <span @click="linkToUpdateMdp()">Mot passe oublié</span>
        </p>
        <p id="errorRegxMdp"></p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

//import { mapState } from "vuex";

export default {
  name: "RegisterPage",
  data: () => {
    return {
      mode: "loginAccount",
      username: "",
      email: "",
      password: "",
    };
  },

  methods: {
    //lien vers la creation de compte
    linkToCreateAccount: function () {
      this.mode = "createAccount";
    },

    //lien vers le login
    linkToLoginAccount: function () {
      this.mode = "loginAccount";
    },
    //lien vers le mot de passe oublié
    linkToUpdateMdp: function () {
      this.$router.push("/mdp-update");
    },

    //btn creation de compte
    btnCreate: function () {
      //creation des criteres de solidité du mot de passe
      const regexs = [
        /^.{8,}$/, //min 8 caractères
        /[A-Z]/, //min 1 lettres majuscules
        /[a-z]/, //min 1 lettres minuscules
        /\d/, //min 1 chiffre
        /[@%#^&*]/, //caracteres speciaux acceptés
      ];

      //joindre l'élément correspondant à l'échec de validité à passer
      const errorMdp = document.getElementById("errorRegxMdp");
      errorMdp.innerHTML = "";

      //test de la validité du password et implémenter le message
      if (regexs.some((regex) => !regex.test(this.password))) {
        errorMdp.innerHTML =
          "Le mot de passe doit contenir 8 caractères minimum, une majuscule, une minuscule, un chiffre et un symbole";
        return;
      }
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      let self = this;
      this.$store
        .dispatch("btnCreate", newUser)
        .then(function () {
          self.btnLogin();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //btn connexion compte existant
    btnLogin: function () {
      //creation des criteres de solidité du mot de passe
      const regexs = [
        /^.{8,}$/, //min 8 caractères
        /[A-Z]/, //min 1 lettres majuscules
        /[a-z]/, //min 1 lettres minuscules
        /\d/, //min 1 chiffre
        /[@%#^&*]/, //caracteres speciaux acceptés
      ];

      //joindre l'élément correspondant à l'échec de validité à passer
      const errorMdp = document.getElementById("errorRegxMdp");
      errorMdp.innerHTML = "";

      //test de la validité du password et implémenter le message
      if (regexs.some((regex) => !regex.test(this.password))) {
        errorMdp.innerHTML =
          "Le mot de passe doit contenir 8 caractères minimum, une majuscule, une minuscule, un chiffre et un symbole";
        return;
      }
      const logUser = {
        username: this.username,
        password: this.password,
      };
      let self = this;
      this.$store
        .dispatch("btnLogin", logUser)
        .then(function () {
          self.$router.push("/home-page");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  /*
  components: {
    HelloWorld
  }
  */
};
</script>
<style>
@import "../assets/registerPage.css";
</style>
