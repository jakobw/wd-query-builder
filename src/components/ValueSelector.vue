<template>
<div class="field has-addons">
  <div class="control">
    <a class="button is-static" :disabled="!visible">Value</a>
  </div>
  <div class="control type-select" :class="{ 'is-expanded': !isSpecificItem }">
    <ValueTypeDropdown :valueType.sync="valueType" :visible="visible"></ValueTypeDropdown>
  </div>
  <div class="control is-expanded has-icons-right" v-show="isSpecificItem">
    <div class="dropdown entity-selector">
      <input class="input dropdown-trigger"
             v-model="query"
             :disabled="!visible"
             @focus="hasFocus = true"
             @blur="hasFocus = false"
             @keydown="isValidInput = false"
             @keydown.enter="dropdownConfirm"
             @keydown.up="dropdownUp($event)"
             @keydown.down="dropdownDown($event)">

      <span class="icon is-right" v-if="!hasFocus && visible">
        <i class="fa" :class="{ 'fa-check': isValidInput, 'fa-warning': !isValidInput }"></i>
      </span>

      <div class="dropdown-menu results"
           v-show="hovering || hasFocus"
           @mouseleave="hovering = false"
           @mouseenter="hovering = true">
        <div class="dropdown-content">
          <i class="dropdown-item" v-if="!query">
            Start typing to search for items...
          </i>
          <i class="dropdown-item" v-if="searching">
            Searching for items...
          </i>

          <a class="dropdown-item"
             v-for="(result, index) in results"
             @click="selectItem(result)"
             @mouseover="dropdownSelect(index)"
             :class="{ 'is-active': index === selected }">
             <p class="dropdown-item-label">{{result.label}}</p>
             <p class="dropdown-item-description">{{result.description}}</p>
           </a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import debounce from 'lodash.debounce'
import ValueTypeDropdown from './ValueTypeDropdown.vue'
import { api } from '../api/newApi'
import ItemSearch from '../api/ItemSearch'
import ItemValue from '../queryBuilder/ItemValue'
import valueTypes from '../queryBuilder/valueTypes'
import ValueFactory from '../queryBuilder/ValueFactory'
import AnyMatchingValue from '../queryBuilder/AnyMatchingValue'

const itemSearch = new ItemSearch(api)

export default {
  props: ['disabled', 'initial', 'objectId'],

  created() {
    if (this.initial) {
      if (this.initial instanceof ItemValue) { // TODO: do this in a smarter way
        this.valueType = valueTypes.SPECIFIC
        this.query = this.initial.getLabel()
      } else {
        this.valueType = Object.values(valueTypes).find(type => type.id === this.initial.getId())
      }

      this.isValidInput = true
    }
  },

  data() {
    return {
      results: [],
      hasFocus: false,
      hovering: false,
      searching: false,
      isValidInput: false,
      valueType: valueTypes.SPECIFIC,
      query: '',
      selected: -1
    }
  },

  watch: {
    query: function(term) {
      this.searching = true
      this.getItems(term)
    },

    valueType: function(type) {
      if (type === valueTypes.SPECIFIC) {
        this.selectValue(new ItemValue({label: ''})) // Note: to reset value for parent
        this.isValidInput = false
        Vue.nextTick(() => this.$el.querySelector('input').focus())
      } else {
        type.object = this.objectId
        this.selectValue(ValueFactory.newValue(type))
      }
    }
  },

  methods: {
    getItems: debounce(function(term) {
      if (!term) {
        this.results = []
        this.searching = false
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
        this.results.length - 1,
        this.selected + 1
      ))
    },

    dropdownSelect(index) {
      this.selected = index
    },

    dropdownConfirm() {
      this.selectItem(this.results[this.selected])
    },

    selectItem(item) {
      this.selectValue(new ItemValue(item))
    },

    selectValue(value) {
      this.unfocus()
      this.query = value.getLabel()
      this.isValidInput = true
      this.$emit('select', value)
    },

    unfocus() {
      this.hovering = false
      this.hasFocus = false
      this.$el.querySelector('input').blur()
      this.selected = 0
    }
  },

  computed: {
    isSpecificItem: function() {
      return this.valueType === valueTypes.SPECIFIC
    },

    visible() {
      return !this.disabled || this.initial
    }
  },

  components: {
    ValueTypeDropdown
  }
}
</script>

<style lang="scss">
.dropdown-item-label {
  font-weight: bold;
}
.type-select {
  &.is-expanded {
    width: 100%;
  }

  .select {
    width: 100%;
    select {
      width: 100%;
    }
  }

  width: 30%;
}
</style>
