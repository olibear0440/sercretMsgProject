<template>
  <div class="mdpUpdatePage">
    <div class="mdpUpdateBloc">
      <div class="title">
        <span @click="linkToHome()" class="fa fa-arrow-left fa-2x" aria-hidden="true"></span>
        <h1>Mot de passe oublié</h1>
      </div>
      <div class="instructions">
        <h4>
          Enregistrez votre adresse mail et suivez les instructions pour
          modifier votre mot de passe
        </h4>
      </div>
      <form class="loginContent">
        <input
          v-model="email"
          type="email"
          placeholder="Adresse email"
          id="email"
        />
      </form>

      <div>
        <button @click="updateMdpLogin()">Envoyez le lien</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MdpUpdate",
  data: () => {
    return {
      email: "",
    };
  },
  methods: {
    updateMdpLogin() {

    },
    linkToHome() {
        this.$router.push("/")

    }
  },
    
};
</script>
<style>
@import "../assets/updateMdp.css";
</style>
