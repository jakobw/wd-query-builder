<template>
  <div class="results">
    <div class="buttons">
      <button class="button is-primary" @click="showResults">Show Results</button>
      <button class="button is-primary" @click="showQuery">Show Query</button>
    </div>

    <div class="result-table" v-if="query">
      <iframe v-bind:src="'https://query.wikidata.org/embed.html#' + encodedQuery"
              referrerpolicy="origin"
              sandbox="allow-scripts allow-same-origin allow-popups">
      </iframe>
    </div>
  </div>
</template>

<script>
import QueryGenerator from '../sparql/QueryGenerator'

export default {
  data() {
    return {
      query: ''
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
      this.query = this.generateQuery()
      this.showResults = true
    }
  },

  computed: {
    encodedQuery() {
      return encodeURI(this.query)
    }
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
