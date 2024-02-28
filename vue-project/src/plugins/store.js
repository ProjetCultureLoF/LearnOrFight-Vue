import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {},
    game: {},
    level: {},
    popup: {
      connect: {
        show: false,
      },
      tutorial: {
        show: false,
      }
    },
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
    },
    setGame(state, data) {
      state.game = data;
    },
    setLevel(state, data) {
      state.level = data;
    },
    resetUser(state) {
      state.user = {};
    },
    resetGame(state) {
      state.game = {};
    },
    resetLevel(state) {
      state.level = {};
    }
  },
});