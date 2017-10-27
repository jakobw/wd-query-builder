<template>
<div class="field has-addons">
  <p class="control">
    <a class="button is-static">Property</a>
  </p>
  <p class="control is-expanded">
    <div class="dropdown entity-selector">
      <input class="input dropdown-trigger"
             v-model="query"
             @focus="hasFocus = true"
             @blur="hasFocus = false"
             @keydown.enter="dropdownConfirm"
             @keydown.up="dropdownUp($event)"
             @keydown.down="dropdownDown($event)">
      <div class="dropdown-menu results"
           v-show="hovering || hasFocus && query"
           @mouseleave="hovering = false"
           @mouseenter="hovering = true">
        <div class="dropdown-content">
          <i class="dropdown-item" v-if="searching">
            Searching for properties...
          </i>
          <i class="dropdown-item" v-else-if="results.length === 0">
            No properties found. Try searching for a different keyword.
          </i>

          <a class="dropdown-item"
             v-for="(result, index) in results"
             @click="select(result)"
             @mouseover="dropdownSelect(index)"
             :class="{ 'is-active': index === selected }">
             <p class="dropdown-item-label">{{result.label}}</p>
             <p class="dropdown-item-description">{{result.description}}</p>
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
import Property from '../queryBuilder/Property'
import specialProperties from '../queryBuilder/specialProperties'

const propertySearch = new PropertySearch(api)

export default {
  data() {
    return {
      results: [],
      selected: 0,
      hasFocus: false,
      hovering: false,
      searching: false,
      query: ''
    }
  },

  watch: {
    query: function(term) {
      this.searching = true
      this.getProperties(term)
    },

    results: function(results) {
      const hasInstanceOf = results.some((result) => result.id === 'P31')
      const hasInstanceOfSubclass = results.some((result) => result === specialProperties.INSTANCE_OF_ANY_SUBCLASS)
      if (hasInstanceOf && !hasInstanceOfSubclass) {
        this.results.unshift(specialProperties.INSTANCE_OF_ANY_SUBCLASS)
      }
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
          this.searching = false
        })
        .catch(error => {
          console.error('api error: ' + error) // TODO: show error to user
        })
    }, 250),

    select(entity) {
      this.selected = 0
      this.hovering = false
      this.query = entity.label
      this.$emit('select', new Property(entity))
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
    }
  }
}
</script>

<style lang="scss">
@import '../style/main';

.entity-selector {
    width: 100%;

    .dropdown-menu {
      display: block;
    }
}
</style>
