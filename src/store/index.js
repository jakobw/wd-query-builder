import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    statementTriples: {},
    qualifierTriples: {},
    limit: ''
  },

  mutations: {
    initialize(state, payload) {
      state.statementTriples = payload.query.statements
      state.qualifierTriples = payload.query.qualifiers
      state.limit = payload.query.limit
    },

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
    },

    setStatementProperty(state, payload) {
      state.statementTriples[payload.subject][payload.id].setProperty(payload.property)
    },

    setStatementValue(state, payload) {
      state.statementTriples[payload.subject][payload.id].setValue(payload.value)
    },

    setQualifierProperty(state, payload) {
      state.qualifierTriples[payload.subject][payload.id].setProperty(payload.property)
    },

    setQualifierValue(state, payload) {
      state.qualifierTriples[payload.subject][payload.id].setValue(payload.value)
    },

    updateLimit(state, payload) {
      state.limit = payload.limit
    }
  }
})
