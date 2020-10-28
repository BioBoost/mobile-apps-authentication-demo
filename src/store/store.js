import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  state: {
    user: {},
  },

  // Commit and track state changes
  mutations: {

    setUser(state, user) {
      state.user = user;
    },

  },

  // Async API requests and updating state through mutations
  actions: {

    login({ commit }, user) {
      console.log(`Storing user ...`);
      commit("setUser", user);
    },

  },

  // Access state (can also filter state data here)
  getters: {

    getUser(state) {
      return state.user;
    },

  }

});
