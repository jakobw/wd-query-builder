<template>
<div id="query-builder" class="query-builder">
  <p>Find all items matching the following statements</p>

  <div class="property-value-pairs">
    <PropertyValuePair v-for="propertyValuePair in propertyValuePairs"></PropertyValuePair>
  </div>
  <button class="button add-button" @click="addNewPair">
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
.query-builder {
  margin-top: 20px
}

.property-value-pairs {
  margin-top: 20px
}
.add-button {
  margin-top: 20px
}
</style>
