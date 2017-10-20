<template>
<div class="property-value-pair">
  <div class="columns">
    <div class="column">
      <PropertySelector v-on:select="showValueSelectorForProperty"></PropertySelector>
    </div>
    <div class="column">
      <ValueSelector :visible="valueSelectorDisabled"></ValueSelector>
    </div>
    <div class="column is-narrow">
      <button class="button">&times;</button>
    </div>
  </div>
</div>
</template>

<script>
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
