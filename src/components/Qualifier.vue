<template>
  <div class="qualifier">
    <div class="columns">
      <div class="column">
        <PropertySelector v-on:select="selectProperty" ref="property"></PropertySelector>
      </div>
      <div class="column">
        <ValueSelector v-on:select="selectValue" :visible="valueSelectorDisabled" ref="value"></ValueSelector>
      </div>
      <div class="column is-narrow">
        <a class="button" @click="$emit('remove')">&times;</a>
      </div>
    </div>

    <div class="columns" v-if="hasItemFilter">
      <div class="column is-offset-1 is-11">
        <QueryBuilder></QueryBuilder>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import PropertySelector from './PropertySelector.vue'
import ValueSelector from './ValueSelector.vue'

export default {
  data() {
    return {
      valueSelectorDisabled: true,
      hasItemFilter: false
    }
  },

  methods: {
    selectProperty() {
      this.valueSelectorDisabled = false
      Vue.nextTick(() => this.$refs.value.$el.querySelector('input').focus()) // TODO: find better way to do this
    },

    selectValue(value) {
      if (value === 'any item matching...') { // TODO: do not use a string literal
        this.hasItemFilter = true
      } else {
        this.hasItemFilter = false
      }
    }
  },

  beforeCreate() {
    // preventing cyclic dependency
    this.$options.components.QueryBuilder = require('./QueryBuilder.vue').default
  },

  components: {
    PropertySelector,
    ValueSelector
  }
}
</script>

<style lang="scss">
</style>
