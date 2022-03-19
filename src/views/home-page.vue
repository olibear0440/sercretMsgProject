<template>
  <div class="homePage">
    <div class="home">
      <!--Titre du bloc "affichage des profils"-->
      <div class="homeTitle">
        <p @click="deleteContact()" class="deleteContact">
          <span class="fa fa-user-times fa-2x" aria-hidden="true"></span>
        </p>
        <h1>Discussions</h1>
        <p @click="newContact()" class="newContact">
          <span class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></span>
        </p>
      </div>
      <div class="friendsProfil">
        <div class="pic"><img :src="pic" :alt="profilPicture"/></div>
        <div class="friendsThings">
          <h2 class="friendsUsername">friends username</h2>
          <p class="friendsLastMsg">friends last msg</p>
        </div>
        <div class="friendsDate">
          <p class="friendsLastMsgDate">date</p>
        </div>
      </div>
      <div class="homeFooter">
        <p @click="myFriends()" class="myFriends">
          <span class="fa fa-comments fa-2x" aria-hidden="true"></span
          >Discussions
        </p>
        <p @click="myProfil()" class="myProfil">
          <span class="fa fa-cog fa-2x" aria-hidden="true"></span>Paramètres
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
<style>
@import "../assets/homePage.css";
</style>
