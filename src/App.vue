<template>
<section class="section">
  <div class="container header">
    <h1 class="title is-1">Wikidata Query Builder</h1>
    <p class="subtitle is-4">Find items by describing their statements</p>
  </div>

  <div class="container">
    <QueryBuilder></QueryBuilder>
  </div>

  <div class="container">
    <QueryResults></QueryResults>
  </div>
</section>
</template>

<script>
import QueryBuilder from './components/QueryBuilder.vue'
import QueryResults from './components/QueryResults.vue'

export default {
  components: {
    QueryBuilder,
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
