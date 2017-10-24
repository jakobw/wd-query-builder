<template>
<div class="statement">
  <div class="columns">
    <div class="column">
      <PropertySelector v-on:select="selectProperty" ref="property"></PropertySelector>
    </div>
    <div class="column">
      <ValueSelector v-on:select="selectValue"
                     :visible="valueSelectorDisabled"
                     :statementPath="statement.getId()"
                     ref="value">
      </ValueSelector>
    </div>
    <div class="column is-narrow">
      <a class="button" @click="$emit('remove')">&times;</a>
    </div>
  </div>

  <div class="columns" v-if="hasItemFilter">
    <div class="column is-offset-1 is-11">
      <StatementList :subject="statement.getId()"></StatementList>
    </div>
  </div>

  <div class="qualifiers" v-if="Object.keys(qualifiers).length > 0">
    <h5 class="title is-5">Qualifiers</h5>

    <Qualifier v-for="qualifier in qualifiers"
               :key="qualifier.getId()"
               :qualifier="qualifier"
               :subject="statement.getId()"
               v-on:remove="removeQualifier(qualifier)">
    </Qualifier>
  </div>

  <a class="add-qualifier button is-small" @click="addQualifier">+ add qualifier</a>
</div>
</template>

<script>
import Vue from 'vue'
import PropertySelector from './PropertySelector.vue'
import ValueSelector from './ValueSelector.vue'
import QualifierComponent from './Qualifier.vue'
import Qualifier from '../wikidata/Qualifier'
import specialValues from '../queryBuilder/specialValues'

export default {
  props: ['statement', 'subject'],

  data() {
    return {
      valueSelectorDisabled: true,
      hasItemFilter: false,
      nextQualifierId: 0
    }
  },

  methods: {
    selectProperty(property) {
      this.valueSelectorDisabled = false
      // TODO: find better way than nextTick
      Vue.nextTick(() => this.$refs.value.$el.querySelector('input').focus())

      this.$store.commit({
        type: 'setStatementProperty',
        subject: this.subject,
        id: this.statement.getId(),
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
        type: 'setStatementValue',
        subject: this.subject,
        id: this.statement.getId(),
        value
      })
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
    }
  },

  computed: {
    qualifiers() {
      return this.$store.state.qualifierTriples[this.statement.getId()] || {}
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

  padding: 10px;
  border: 1px solid darken($light, 10%);
  background: $white;
  margin-top: 20px;

  .add-qualifier {
    margin-top: 10px;
  }
}
</style>
