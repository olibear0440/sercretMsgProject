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
    instance.defaults.headers.common["Authorization"] = loginUser.token;
    localStorage.setItem("user", JSON.stringify(loginUser));
    state.loginUser = loginUser;
    console.log(loginUser);
  },
};
const actions = {
  // appel api de la creation d'un compte sur le bouton de validation
  /*
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
        //console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  },
  */
  btnCreate: async ({ commit }, newUser) => {
    try {
      let response = await instance.post("/user/signup", newUser);
      commit("CREATE_USER", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  btnLogin: async ({ commit }, logUser) => {
    try {
      let response = await instance.post("/user/login", logUser);
      commit("LOG_USER", response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
});
