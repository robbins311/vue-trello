import Vuex from 'vuex';
import Vue from "vue";
import modules from "./modules.js";


Vue.use(Vuex)


export const store = new Vuex.Store({
  state: modules.state,
  getters : modules.getters,
  mutations: modules.mutations,
  actions: modules.actions,

});
