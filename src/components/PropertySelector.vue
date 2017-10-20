<template>
<div class="field has-addons">
  <p class="control">
    <button class="button is-static">Property</button>
  </p>
  <p class="control is-expanded">
    <div class="dropdown entity-selector">
      <input class="input dropdown-trigger" v-model="query" @click="reset()">
      <div class="dropdown-menu results" v-show="results.length > 0 && !selected">
        <div class="dropdown-content">
          <a class="dropdown-item"
             v-for="result in results"
             @click="select(result)">
             {{result.label}}
           </a>
        </div>
      </div>
    </div>
  </p>
</div>
</template>

<script>
import debounce from 'lodash.debounce'
import { api } from '../api/newApi'
import PropertySearch from '../api/PropertySearch'

const propertySearch = new PropertySearch(api)

export default {
  data() {
    return {
      results: [],
      selected: false,
      query: ''
    }
  },

  watch: {
    query: function(term) {
      this.getProperties(term)
    }
  },

  methods: {
    getProperties: debounce(function(term) {
      if (!term) {
        this.results = []
        return
      }

      propertySearch.search(term)
        .then(data => {
          this.results = data
        })
        .catch(error => {
          console.error('api error: ' + error) // TODO: do something more sensible
        })
    }, 250),

    select(entity) {
      this.selected = true
      this.query = entity.label
      this.$emit('select', entity)
    },

    reset() {
      this.query = ''
      this.results = []
      this.selected = false
    }
  }
}
</script>

<style lang="scss">
.entity-selector {
    width: 100%;

    .dropdown-menu {
      display: block;
    }
}
</style>
