import { createStore } from "vuex";
const axios = require("axios");

//configuration instance Axios
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const localStorageUser = localStorage.getItem("user");
if (localStorageUser !== null) {
  let localStorageUserInfo = JSON.parse(localStorageUser);
  console.log(localStorageUserInfo);
} else {
  let userNotFound = {
    userId: -1,
    token: "",
  };
  console.log("userNotFound", userNotFound);
}

const state = {};
const getters = {};
const mutations = {
  CREATE_USER(state, createNewUser) {
    state.createNewUser = createNewUser;
  },
  LOG_USER(state, user) {
    instance.defaults.headers.common["Authorization"] = user.token;
    localStorage.setItem("user", JSON.stringify(user));
    state.user = user;
  },
};
const actions = {
  // appel api de la creation d'un compte sur le btn de validation
  btnCreate: async ({ commit }, newUser) => {
    try {
      let response = await instance.post("/user/signup", newUser);
      commit("CREATE_USER", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  // appel api de le login d'un compte existant sur le btn login
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
