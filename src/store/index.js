import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    triples: {}
  },

  actions: {

  },

  mutations: {
    addStatement(state, payload) {
      if (!state.triples[payload.subject]) {
        Vue.set(state.triples, payload.subject, {})
      }

      Vue.set(state.triples[payload.subject], payload.statement.getId(), payload.statement)
    }
  }
})
