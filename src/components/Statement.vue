<template>
<div class="statement">
  <div class="columns">
    <div class="column">
      <PropertySelector v-on:select="showValueSelectorForProperty" ref="property"></PropertySelector>
    </div>
    <div class="column">
      <ValueSelector :visible="valueSelectorDisabled" ref="value"></ValueSelector>
    </div>
    <div class="column is-narrow">
      <button class="button">&times;</button>
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
      valueSelectorDisabled: true
    }
  },

  methods: {
    showValueSelectorForProperty(property) {
      this.valueSelectorDisabled = false
      Vue.nextTick(() => this.$refs.value.$el.querySelector('input').focus()) // TODO: find better way to do this
    }
  },

  components: {
    PropertySelector,
    ValueSelector
  }
}
</script>

<style lang="scss">
</style>
