<template>
  <div class="results">
    <div class="buttons columns">
      <div class="column">
        <button class="button is-primary" @click="showResults">Show Results</button>
        <button class="button is-primary" @click="showQuery">Show Query</button>
      </div>

      <div class="column is-narrow">
        <ShareQuery></ShareQuery>
      </div>
    </div>

    <div class="result-table" v-if="resultsVisible">
      <iframe v-bind:src="'https://query.wikidata.org/embed.html#' + encodedQuery"
              referrerpolicy="origin"
              sandbox="allow-scripts allow-same-origin allow-popups">
      </iframe>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import QueryGenerator from '../sparql/QueryGenerator'
import ShareQuery from './ShareQuery.vue'

export default {
  data() {
    return {
      query: '',
      resultsVisible: false
    }
  },

  methods: {
    generateQuery() {
      const generator = new QueryGenerator(
        this.$store.state.statementTriples,
        this.$store.state.qualifierTriples
      )

      return generator.generateQuery()
    },

    showQuery() {
      console.log(this.generateQuery())
    },

    showResults() {
      this.resultsVisible = false
      Vue.nextTick(() => {
        this.query = this.generateQuery()
        this.resultsVisible = true
      })
    }
  },

  computed: {
    encodedQuery() {
      return encodeURI(this.query)
    }
  },

  components: {
    ShareQuery
  }
}
</script>

<style lang="scss">
.result-table {
  margin-top: 20px;

  iframe {
    border: none;
    width: 100%;
    height: 600px;
  }
}
</style>
