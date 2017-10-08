<template>
<div class="property-value-pair">
  <div class="columns">
    <div class="column">
      <PropertySelector></PropertySelector>
    </div>
    <div class="column">
      <ValueSelector></ValueSelector>
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
  components: {
    PropertySelector,
    ValueSelector
  }
}
</script>

<style lang="scss">
</style>
