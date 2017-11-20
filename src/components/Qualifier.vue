<template>
  <div class="qualifier">
    <div class="columns">
      <div class="column">
        <PropertySelector v-on:select="selectProperty"
                          :initial="propertyLabel">
        </PropertySelector>
      </div>
      <div class="column">
        <ValueSelector v-on:select="selectValue"
                       :disabled="valueSelectorDisabled"
                       :initial="valueLabel"
                       :objectId="qualifier.getId()"
                       ref="value">
        </ValueSelector>
      </div>
      <div class="column is-narrow">
        <a class="button" @click="$emit('remove')">&times;</a>
      </div>
    </div>

    <div class="columns" v-if="hasItemFilter()">
      <div class="column is-offset-1 is-11">
        <StatementList :subject="qualifier.getId()"></StatementList>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import PropertySelector from './PropertySelector.vue'
import ValueSelector from './ValueSelector.vue'
import specialValues from '../queryBuilder/specialValues'

export default {
  props: ['qualifier', 'subject'],

  data() {
    return {
      valueSelectorDisabled: true
    }
  },

  methods: {
    selectProperty(property) {
      this.valueSelectorDisabled = false
      Vue.nextTick(() => this.$refs.value.$el.querySelector('input').focus())

      this.$store.commit({
        type: 'setQualifierProperty',
        subject: this.subject,
        id: this.qualifier.getId(),
        property
      })
    },

    selectValue(value) {
      this.$store.commit({
        type: 'setQualifierValue',
        subject: this.subject,
        id: this.qualifier.getId(),
        value
      })

      // TODO: This is needed because Vue does not detect changes on the
      //       qualifier due to it not using Vue.set. There is probably a
      //       better way to do this...
      this.$forceUpdate()
    },

    hasItemFilter() {
      const value = this.qualifier.getValue()
      return value && value.getId() === specialValues.ANY_MATCHING.id
    },
  },

  computed: {
    propertyLabel() {
      const property = this.qualifier.getProperty()
      return property && property.getLabel() || ''
    },

    valueLabel() {
      const value = this.qualifier.getValue()
      return value && value.getLabel() || ''
    }
  },

  beforeCreate() {
    // preventing cyclic dependency
    this.$options.components.StatementList = require('./StatementList.vue').default
  },

  components: {
    PropertySelector,
    ValueSelector
  }
}
</script>

<style lang="scss">
@import "../style/main.scss";

.qualifier {
  .button, .input {
    @extend .is-small;
  }
}
</style>
