import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    statementTriples: {},
    qualifierTriples: {}
  },

  actions: {

  },

  mutations: {
    addStatement(state, payload) {
      if (!state.statementTriples[payload.subject]) {
        Vue.set(state.statementTriples, payload.subject, {})
      }

      Vue.set(state.statementTriples[payload.subject], payload.statement.getId(), payload.statement)
    },

    removeStatement(state, payload) {
      Vue.delete(state.statementTriples[payload.subject], payload.statement.getId())
    },

    addQualifier(state, payload) {
      if (!state.qualifierTriples[payload.subject]) {
        Vue.set(state.qualifierTriples, payload.subject, {})
      }

      Vue.set(state.qualifierTriples[payload.subject], payload.qualifier.getId(), payload.qualifier)
    },

    removeQualifier(state, payload) {
      Vue.delete(state.qualifierTriples[payload.subject], payload.qualifier.getId())
    }
  }
})
