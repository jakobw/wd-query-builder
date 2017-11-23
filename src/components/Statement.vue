<template>
<div class="statement-wrapper">
  <div class="statement builder-box">
    <div class="columns">
      <div class="column">
        <PropertySelector v-on:select="selectProperty"
                          :initial="propertyLabel">
        </PropertySelector>
      </div>
      <div class="column">
        <ValueSelector v-on:select="selectValue"
                       :disabled="valueSelectorDisabled"
                       :objectId="statement.getId()"
                       :initial="statement.getValue()"
                       ref="value">
        </ValueSelector>
      </div>
      <div class="column is-narrow">
        <a class="button" @click="$emit('remove')">&times;</a>
      </div>
    </div>

    <div class="columns" v-if="hasItemFilter()">
      <div class="column is-offset-1 is-11">
        <StatementList :subject="statement.getId()"></StatementList>
      </div>
    </div>

    <div class="qualifiers" v-if="Object.keys(qualifiers).length > 0">
      <h5 class="title is-5">Qualifier filters for this statement</h5>

      <Qualifier v-for="qualifier in qualifiers"
                 :key="qualifier.getId()"
                 :qualifier="qualifier"
                 :subject="statement.getId()"
                 v-on:remove="removeQualifier(qualifier)">
      </Qualifier>
    </div>
  </div>

  <div class="add-qualifier">
    <a class="button is-small" @click="addQualifier">+ add qualifier filter</a>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import PropertySelector from './PropertySelector.vue'
import ValueSelector from './ValueSelector.vue'
import QualifierComponent from './Qualifier.vue'
import Qualifier from '../queryBuilder/Qualifier'
import valueTypes from '../queryBuilder/valueTypes'

export default {
  props: ['statement', 'subject'],

  data() {
    return {
      valueSelectorDisabled: true,
      nextQualifierId: 0
    }
  },

  methods: {
    selectProperty(property) {
      this.valueSelectorDisabled = false
      Vue.nextTick(() => this.$refs.value.$el.querySelector('input').focus())

      this.$store.commit({
        type: 'setStatementProperty',
        subject: this.subject,
        id: this.statement.getId(),
        property
      })
    },

    selectValue(value) {
      this.$store.commit({
        type: 'setStatementValue',
        subject: this.subject,
        id: this.statement.getId(),
        value
      })

      // TODO: This is needed because Vue does not detect changes on the
      //       statement due to it not using Vue.set. There is probably a
      //       better way to do this...
      this.$forceUpdate()
    },

    addQualifier() {
      this.$store.commit({
        type: 'addQualifier',
        subject: this.statement.getId(),
        qualifier: new Qualifier(this.subject + '_q_' + this.nextQualifierId)
      })
      this.nextQualifierId++
    },

    removeQualifier(qualifier) {
      this.$store.commit({
        type: 'removeQualifier',
        subject: this.statement.getId(),
        qualifier
      })
    },

    hasItemFilter() {
      const value = this.statement.getValue()
      return value && value.getId() === valueTypes.ANY_MATCHING.id
    },
  },

  computed: {
    qualifiers() {
      return this.$store.state.qualifierTriples[this.statement.getId()] || {}
    },

    propertyLabel() {
      const property = this.statement.getProperty()
      return property && property.getLabel() || ''
    }
  },

  beforeCreate() {
    // preventing cyclic dependency
    this.$options.components.StatementList = require('./StatementList.vue').default
  },

  components: {
    PropertySelector,
    ValueSelector,
    Qualifier: QualifierComponent
  }
}
</script>

<style lang="scss">
@import '../style/main.scss';

.statement {
  &:first-child {
    margin-top: 0;
  }

  margin-top: 20px;
  &.builder-box {
    padding: 15px 10px;
  }
}

.qualifiers {
  .title.is-5 {
    font-size: 1em;
    margin-bottom: 5px;
  }
}

.statement-wrapper:last-child {
  .add-qualifier {
    margin-bottom: 0;
  }
}

.add-qualifier {
  text-align: right;
  margin: -1px 0 10px 0;
  padding-right: 0.75em;

  .button {
    border-top: 0;
    color: $blue;
  }
}
</style>
