<template>
<div class="share-query">
  <button class="button" @click="share">Share Query</button>
</div>
</template>

<script>
import QuerySerializer from '../serialization/QuerySerializer'

export default {
  methods: {
    share() {
      console.log(this.generateShareUrl())
    },

    generateShareUrl() {
      const serializer = new QuerySerializer

      return window.location.origin
        + window.location.pathname
        + '?query='
        + encodeURI(JSON.stringify(serializer.serialize(this.getQueryJson())))
    },

    getQueryJson() {
      return {
        statements: this.$store.state.statementTriples,
        qualifiers: this.$store.state.qualifierTriples
      }
    }
  }
}
</script>

<style lang="scss">
</style>
