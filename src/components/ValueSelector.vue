<template>
<div class="field has-addons">
  <p class="control">
    <a class="button is-static" :disabled="visible">Value</a>
  </p>
  <p class="control is-expanded">
    <div class="dropdown entity-selector">
      <input class="input dropdown-trigger"
             v-model="query"
             :disabled="visible"
             @focus="hasFocus = true"
             @blur="hasFocus = false"
             @keydown.enter="dropdownConfirm"
             @keydown.up="dropdownUp($event)"
             @keydown.down="dropdownDown($event)">
      <div class="dropdown-menu results"
           v-show="hovering || hasFocus"
           @mouseleave="hovering = false"
           @mouseenter="hovering = true">
        <div class="dropdown-content">
          <i class="dropdown-item" v-if="!query">
            Start typing to search for specific items...
          </i>
          <i class="dropdown-item" v-if="searching">
            Searching for items...
          </i>
          <i class="dropdown-item" v-else-if="!results.length && !filteredSpecialValues.length">
            No items found. Try searching for a different keyword.
          </i>

          <a class="dropdown-item"
             v-for="(value, index) in filteredSpecialValues"
             @mouseover="dropdownSelect(index)"
             @click="selectSpecialValue(value)"
             :class="{ 'is-active': index === selected }">
             {{value}}
          </a>
          <hr class="dropdown-divider" v-show="results.length > 0 && filteredSpecialValues.length > 0">
          <a class="dropdown-item"
             v-for="(result, index) in results"
             @click="selectItem(result)"
             @mouseover="dropdownSelect(filteredSpecialValues.length + index)"
             :class="{ 'is-active': filteredSpecialValues.length + index === selected }">
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
import ItemValue from '../queryBuilder/ItemValue'
import specialValues from '../queryBuilder/specialValues'
import AnyMatchingValue from '../queryBuilder/AnyMatchingValue'

const itemSearch = new ItemSearch(api)

export default {
  props: ['visible', 'statementPath'],

  data() {
    return {
      specialValues: Object.values(specialValues),
      results: [],
      hasFocus: false,
      hovering: false,
      searching: false,
      query: '',
      selected: 0
    }
  },

  watch: {
    query: function(term) {
      this.searching = true
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
          this.searching = false
        })
        .catch(error => {
          console.error('api error: ' + error) // TODO: show error to user
        })
    }, 250),

    dropdownUp(event) {
      event.preventDefault()
      this.dropdownSelect(Math.max(0, this.selected - 1))
    },

    dropdownDown(event) {
      event.preventDefault()
      this.dropdownSelect(Math.min(
        this.filteredSpecialValues.length + this.results.length - 1,
        this.selected + 1
      ))
    },

    dropdownSelect(index) {
      this.selected = index
    },

    dropdownConfirm() {
      if (this.selected < this.filteredSpecialValues.length) {
        this.selectSpecialValue(this.filteredSpecialValues[this.selected])
      } else {
        this.selectItem(this.results[this.selected - this.filteredSpecialValues.length])
      }
    },

    selectSpecialValue(value) {
      this.unfocus()
      this.query = value

      if (value === specialValues.ANY_MATCHING) {
        // TODO: use a factory for all special values
        // TODO: value selector should not need to know statement path; statement should handle special values?
        value = new AnyMatchingValue(this.statementPath)
      }
      this.$emit('select', value)
    },

    selectItem(item) {
      this.unfocus()
      this.query = item.label
      this.$emit('select', new ItemValue(item))
    },

    unfocus() {
      this.hovering = false
      this.hasFocus = false
      this.$el.querySelector('input').blur()
      this.selected = 0
    }
  },

  computed: {
    filteredSpecialValues: function () {
      return this.specialValues.filter(value => value.includes(this.query))
    }
  }
}
</script>

<style lang="scss">
.entity-label {
  font-weight: bold;
}
</style>
