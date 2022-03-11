<template>
  <div class="home">
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
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

//import { mapState } from "vuex";

export default {
  name: "HomeView",
  data: () => {
    return {
      mode: "loginAccount",
      username: "",
      email: "",
      password: "",
    };
  },

  methods: {
    linkToCreateAccount: function () {
      this.mode = "createAccount";
    },
    linkToLoginAccount: function () {
      this.mode = "loginAccount";
    },
    btnCreate: function () {
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("btnCreate", newUser);
    },
    btnLogin: function () {
      const logUser = {
        username: this.username,
        password: this.password,
      };
      this.$store.dispatch("btnLogin", logUser);
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
@import "../assets/user.css";
</style>
