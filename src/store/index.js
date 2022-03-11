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
  btnCreate: ({ commit }, newUser) => {
    instance
      .post("/user/signup", newUser)
      .then((response) => {
        console.log(response.data);
        commit("CREATE_USER", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  btnLogin: ({ commit }, logUser) => {
    instance
      .post("/user/login", logUser)
      .then((response) => {
        console.log(response.data);
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
