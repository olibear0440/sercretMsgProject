import { createStore } from "vuex";
const axios = require("axios");

//configuration instance Axios
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const state = {};
const getters = {};
const mutations = {
  CREATE_USER(state, createNewUser) {
    state.createNewUser = createNewUser;
  },
  LOG_USER(state, loginUser) {
    state.loginUser = loginUser;
  }
};
const actions = {
  
  // appel api de la creation d'un compte sur le bouton de validation
  btnCreate: ({ commit }, newUser) => {
    instance
      .post("/user/signup", newUser)
      .then((response) => {
        commit("CREATE_USER", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // appel api du login sur le bouton de connexion
  btnLogin: ({ commit }, logUser) => {
    instance
      .post("/user/login", logUser)
      .then((response) => {
        commit("LOG_USER", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
});
