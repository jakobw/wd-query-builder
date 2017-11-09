<template>
<section class="section">
  <div class="container header">
    <h1 class="title is-1">Wikidata Query Builder</h1>
    <p class="subtitle is-4">Find items by describing their statements</p>
  </div>

  <div class="container">
    <StatementList subject="item"></StatementList>
  </div>

  <div class="container">
    <QueryOptions></QueryOptions>
  </div>

  <div class="container">
    <hr>

    <QueryResults></QueryResults>
  </div>
</section>
</template>

<script>
require('font-awesome-sass-loader');

import { store } from './store'
import StatementList from './components/StatementList.vue'
import QueryOptions from './components/QueryOptions.vue'
import QueryResults from './components/QueryResults.vue'
import QueryDeserializer from './serialization/QueryDeserializer'

export default {
  store,

  methods: {
    initializeFromUrl() {
      const query = JSON.parse(decodeURI(
        window.location.search.split('?query=')[1]
      ))
      const deserializer = new QueryDeserializer()

      this.$store.commit({
        type: 'initialize',
        query: deserializer.deserialize(query)
      })
    }
  },

  created() {
    if (window.location.search.includes('?query')) {
      this.initializeFromUrl()
    }
  },

  components: {
    StatementList,
    QueryOptions,
    QueryResults
  }
}
</script>

<style lang="scss">
@import 'style/main.scss';

.container.header {
  margin-bottom: 20px;
}
</style>
