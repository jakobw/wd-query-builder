<template>
<section class="section">
  <div class="container header">
    <h1 class="title is-1">Wikidata Query Builder</h1>
    <p class="subtitle is-4">Find items by describing their statements</p>
  </div>

  <div class="container">
    <StatementList></StatementList>
  </div>

  <div class="container">
    <QueryResults></QueryResults>
  </div>
</section>
</template>

<script>
import StatementList from './components/StatementList.vue'
import QueryResults from './components/QueryResults.vue'

export default {
  components: {
    StatementList,
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
