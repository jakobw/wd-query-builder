<template>
<div id="query-builder">
  <p>Find all items matching the following statements</p>

  <div class="property-value-pairs">
    <PropertyValuePair v-for="propertyValuePair in propertyValuePairs"></PropertyValuePair>
  </div>
  <button class="button" @click="addNewPair">
    + Add another property-value pair
  </button>
</div>
</template>

<script>
import PropertyValuePair from './PropertyValuePair.vue'

export default {
  data() {
    return {
      propertyValuePairs: []
    }
  },

  methods: {
    addNewPair() {
      this.propertyValuePairs.push({})
    }
  },

  components: {
    PropertyValuePair
  }
}
</script>

<style lang="scss">
</style>
