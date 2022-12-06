import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const state = {
  overlay: false,
  lastListId: 3,
  lastCardId: 3,
  currentData: null,
  lists: [
    {
      id: 1,
      name: "To Do",
    },
    {
      id: 2,
      name: "Doing",
    },
    {
      id: 3,
      name: "Done",
    },
  ],
  cards: [
    {
      listId: 1,
      id: 1,
      name: "card 1",
    },
    {
      listId: 2,
      id: 2,
      name: "card 2",
    },
    {
      listId: 3,
      id: 3,
      name: "card 3",
    },
  ],
};

const getters = {
  lastListId(state) {
    return state.lastListId;
  },
  lastCardId(state) {
    return state.lastCardId;
  },
  lists(state) {
    return state.lists;
  },
  cards(state) {
    return state.cards;
  },
  overlay(state) {
    return state.overlay;
  },
  currentData(state) {
    return state.currentData;
  },
};

const mutations = {
  createNewList(state, payload) {
    state.lastListId++;
    const list = {
      id: state.lastListId,
      name: payload,
    };
    state.lists.push(list);
  },
  createNewCard(state, payload) {
    state.lastCardId++;
    const card = {
      listId: payload.listId,
      id: state.lastCardId,
      name: payload.name,
    };
    state.cards.push(card);
  },
  toggleOverlay(state) {
    state.overlay = !state.overlay;
  },
  falseOverlay(state) {
    state.overlay = false;
  },
  openForm(state, payload) {
    state.currentData = payload;
  },
  saveCard(state, payload) {
    state.cards = state.cards.map((card) => {
      if (card.id === payload.id) {
        return Object.assign({}, card, payload);
      }
      return card;
    });
  },
  deleteCard(state, payload) {
    state.currentData = payload;
    const cards = state.cards;
    const indexToDelete = state.cards
      .map((card) => card.id)
      .indexOf(state.cards.id);
    /* let id = todoItem.id;
      let removedEl = state.todos.findIndex((x) => x.id == id);
      if(removedEl !== null) {
          // If it exists, delete it!
          state.todos.splice(removedEl, 1);
      } */
    console.log("state = " + JSON.stringify(state));
    console.log(cards);
    console.log("payload = " + JSON.stringify(payload));
    console.log("indexToDelete = " + JSON.stringify(indexToDelete));
    // cards.filter((card) => card.id !== payload.id);
    state.cards.splice(indexToDelete, 1);
  },
};

const actions = {
  createList(context, payload) {
    context.commit("createNewList", payload);
  },
  createCard(context, payload) {
    context.commit("createNewCard", payload);
  },
  toggleOverlay(context) {
    context.commit("toggleOverlay");
  },
  openForm(context, payload) {
    context.commit("openForm", payload);
  },
  saveCard(context, payload) {
    context.commit("saveCard", payload);
  },
  deleteCard(context, payload) {
    context.commit("deleteCard", payload);
  },
  falseOverlay(context) {
    context.commit("falseOverlay");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
