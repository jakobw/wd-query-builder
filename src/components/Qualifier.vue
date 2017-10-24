<template>
  <div class="qualifier">
    <div class="columns">
      <div class="column">
        <PropertySelector v-on:select="selectProperty" ref="property"></PropertySelector>
      </div>
      <div class="column">
        <ValueSelector v-on:select="selectValue" :visible="valueSelectorDisabled" ref="value"></ValueSelector>
      </div>
      <div class="column is-narrow">
        <a class="button" @click="$emit('remove')">&times;</a>
      </div>
    </div>

    <div class="columns" v-if="hasItemFilter">
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
      valueSelectorDisabled: true,
      hasItemFilter: false
    }
  },

  methods: {
    selectProperty(property) {
      this.valueSelectorDisabled = false
      Vue.nextTick(() => this.$refs.value.$el.querySelector('input').focus()) // TODO: find better way to do this

      this.$store.commit({
        type: 'setQualifierProperty',
        subject: this.subject,
        id: this.qualifier.getId(),
        property
      })
    },

    selectValue(value) {
      if (value.getObject().indexOf('?') === 0) { // FIXME: silly
        this.hasItemFilter = true
      } else {
        this.hasItemFilter = false
      }

      this.$store.commit({
        type: 'setQualifierValue',
        subject: this.subject,
        id: this.qualifier.getId(),
        value
      })
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
</style>
