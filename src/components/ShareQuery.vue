<template>
<div class="share-query">
  <button class="button" @click="share">Share Query</button>
</div>
</template>

<script>
export default {
  methods: {
    share() {
      console.log(this.generateShareUrl())
    },

    generateShareUrl() {
      return window.location.origin
        + '/'
        + window.location.pathname
        + '?query='
        + encodeURI(this.getQueryJson())
    },

    getQueryJson() {
      return JSON.stringify({
        statements: this.$store.state.statementTriples,
        qualifiers: this.$store.state.qualifierTriples
      })
    }
  }
}
</script>

<style lang="scss">
</style>
