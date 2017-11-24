<template>
<div class="property-selector">
  <div class="field has-addons">
    <div class="control">
      <a class="button is-static">Property</a>
    </div>
    <div class="control is-expanded has-icons-right">
      <div class="dropdown entity-selector">
        <input class="input"
               v-model="query"
               @focus="hasFocus = true"
               @blur="hasFocus = false"
               @keydown="isValidInput = false"
               @keydown.enter="dropdownConfirm"
               @keydown.up="dropdownUp($event)"
               @keydown.down="dropdownDown($event)">

        <span class="icon is-right" v-if="!hasFocus">
         <i class="fa" :class="{ 'fa-check': isValidInput, 'fa-warning': !isValidInput }"></i>
        </span>

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
    </div>
  </div>
  <div class="notification special-property" v-if="specialProperty">
    <label class="label">
      <input type="checkbox" v-model="isSpecialPropertyActive" @change="updateProperty">
      <strong>{{specialProperty.description}}</strong>
      {{specialProperty.longDescription}}
    </label>
  </div>
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
  props: ['initial'],

  data() {
    return {
      results: [],
      selected: 0,
      hasFocus: false,
      hovering: false,
      searching: false,
      isValidInput: this.initial,
      query: '',
      selectedProperty: null
    }
  },

  watch: {
    query: function(term) {
      this.searching = true
      this.getProperties(term)
    }
  },

  created() {
    if (this.initial) {
      this.selectedProperty = this.initial
      this.query = this.selectedProperty.getLabel()
      this.isSpecialPropertyActive = !this.selectedProperty.getId().match(/^P\d+$/) // TODO: this is silly
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
      this.isValidInput = true
      this.selectedProperty = new Property(entity)
      if (this.specialProperty) {
        this.isSpecialPropertyActive = true // on by default
      }
      this.updateProperty()
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

    updateProperty() {
      this.$emit('select', new Property({
        label: this.selectedProperty.getLabel(),
        id: this.isSpecialPropertyActive ? this.specialProperty.specialId : this.selectedProperty.getId()
      }))
    }
  },

  computed: {
    specialProperty() {
      if (!this.selectedProperty) return null

      const selectedId = this.selectedProperty.getId()
      return specialProperties.find(
        p => selectedId === p.triggerId || selectedId === p.specialId
      )
    }
  },

  mounted() {
    if (!this.initial) this.$el.querySelector('input').focus()
  },
}
</script>

<style lang="scss">
@import '../style/main';

.notification.special-property {
  background-color: $light-blue;
  padding: 5px 10px;
  border-top: 0;
  margin-top: -11px;

  .label {
    color: $dark-blue;
    font-weight: normal;
  }
}

.entity-selector {
    width: 100%;

    .dropdown-menu {
      display: block;
    }
}
</style>
