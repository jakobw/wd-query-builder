<template>
<section class="section">
  <div class="container header">
    <h1 class="title is-1">Wikidata Query Builder</h1>
    <p class="subtitle is-4">Find items by describing their statements</p>
  </div>

  <div class="container">
    <QueryBuilder></QueryBuilder>
  </div>
</section>
</template>

<script>
import QueryBuilder from './components/QueryBuilder.vue'

export default {
  components: {
    QueryBuilder
  }
}
</script>

<style lang="scss">
@import 'style/main.scss';

.container.header {
  margin-bottom: 20px;
}
</style>
