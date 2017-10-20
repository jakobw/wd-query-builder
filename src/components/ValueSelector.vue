<template>
<div class="field has-addons">
  <p class="control">
    <button class="button is-static" :disabled="visible">Value</button>
  </p>
  <p class="control is-expanded">
    <div class="dropdown entity-selector">
      <input class="input dropdown-trigger" v-model="query" @click="reset()" :disabled="visible">
      <div class="dropdown-menu results" v-show="results.length > 0 && !selected">
        <div class="dropdown-content">
          <a class="dropdown-item"
             v-for="result in results"
             @click="select(result)">
             <p class="entity-label">{{result.label}}</p>
             <p class="entity-description">{{result.description}}</p>
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
import ItemSearch from '../api/ItemSearch'

const itemSearch = new ItemSearch(api)

export default {
  props: ['visible'],

  data() {
    return {
      results: [],
      selected: false,
      query: ''
    }
  },

  watch: {
    query: function(term) {
      this.getItems(term)
    }
  },

  methods: {
    getItems: debounce(function(term) {
      if (!term) {
        this.results = []
        return
      }

      itemSearch.search(term)
        .then(data => {
          this.results = data
        })
        .catch(error => {
          console.error('api error: ' + error) // TODO: show error to user
        })
    }, 250),

    select(entity) {
      this.selected = true
      this.query = entity.label
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
.entity-label {
  font-weight: bold;
}
</style>
