<template>
<div class="field has-addons">
  <p class="control">
    <a class="button is-static">Property</a>
  </p>
  <p class="control is-expanded">
    <div class="dropdown entity-selector">
      <input class="input dropdown-trigger"
             v-model="query"
             @focus="focus"
             @blur="unfocus"
             @keydown.enter="dropdownConfirm"
             @keydown.up="dropdownUp($event)"
             @keydown.down="dropdownDown($event)">
      <div class="dropdown-menu results" v-show="hasFocus && query">
        <div class="dropdown-content">
          <a class="dropdown-item"
             v-for="(result, index) in results"
             @click="select(result)"
             @mouseover="dropdownSelect(index)"
             :class="{ 'is-active': index === selected }">
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
import PropertySearch from '../api/PropertySearch'

const propertySearch = new PropertySearch(api)

export default {
  data() {
    return {
      results: [],
      selected: 0,
      hasFocus: false,
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
          console.error('api error: ' + error) // TODO: show error to user
        })
    }, 250),

    select(entity) {
      this.query = entity.label
      this.$emit('select', entity)
    },

    dropdownUp(event) {
      event.preventDefault()
      this.dropdownSelect(Math.max(0, this.selected - 1))
    },

    dropdownDown(event) {
      event.preventDefault()
      this.dropdownSelect(Math.min(
        this.results.length - 1,
        this.selected + 1
      ))
    },

    dropdownSelect(index) {
      this.selected = index
    },

    dropdownConfirm() {
      this.select(this.results[this.selected])
    },

    focus() {
      this.hasFocus = true
    },

    unfocus() {
      this.hasFocus = false
      this.selected = 0
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
