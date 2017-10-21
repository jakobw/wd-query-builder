<template>
<section class="section">
  <div class="container">
    <h1 class="title">Wikidata Query Builder</h1>
  </div>

  <div class="container">
    <p>Find all items matching the following statements</p>

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
@import '~bulma/bulma'
</style>
