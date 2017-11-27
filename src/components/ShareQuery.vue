<template>
<div class="share-query">
  <button class="button" @click="share">Share Query</button>

  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background" @click="isActive = false"></div>
    <div class="modal-content">
      <div class="box">
        <h5 class="title is-5">You can share your query with the link below</h5>
        <input class="input" v-model="link">
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="isActive = false"></button>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import QuerySerializer from '../serialization/QuerySerializer'

export default {
  data() {
    return {
      link: '',
      isActive: false
    }
  },

  methods: {
    share() {
      this.link = this.generateShareUrl()
      this.isActive = true
      Vue.nextTick(() => this.$el.querySelector('input').select())
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
        qualifiers: this.$store.state.qualifierTriples,
        select: this.$store.state.select,
        limit: this.$store.state.limit
      }
    }
  }
}
</script>

<style lang="scss">
</style>
