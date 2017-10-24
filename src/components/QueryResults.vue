<template>
  <div class="results">
    <div class="buttons">
      <button class="button is-primary">Show Results</button>
      <button class="button is-primary" @click="showQuery">Show Query</button>
    </div>
  </div>
</template>

<script>
import QueryGenerator from '../sparql/QueryGenerator'

export default {
  methods: {
    showQuery() {
      const generator = new QueryGenerator(
        this.$store.state.statementTriples,
        this.$store.state.qualifierTriples
      )

      console.log(generator.generateQuery())
    }
  }
}
</script>

<style lang="scss">
</style>
