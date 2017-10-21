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
             @focus="focus"
             @blur="unfocus"
             @keydown.enter="dropdownConfirm"
             @keydown.up="dropdownUp($event)"
             @keydown.down="dropdownDown($event)">
      <div class="dropdown-menu results" v-show="hasFocus">
        <div class="dropdown-content">
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

const itemSearch = new ItemSearch(api)

export default {
  props: ['visible'],

  data() {
    return {
      specialValues: ['any item', 'any item matching...', 'statement does not exist'],
      results: [],
      hasFocus: false,
      query: '',
      selected: 0
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
      this.query = value
      this.$emit('select', value)
    },

    selectItem(item) {
      this.query = item.label
      this.$emit('select', item)
    },

    focus() {
      this.hasFocus = true
    },

    unfocus() {
      this.hasFocus = false
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
