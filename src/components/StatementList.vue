<template>
<div class="statement-list">
  <div class="statements">
    <Statement v-for="statement in statements"
               :key="statement.getId()"
               :subject="subject"
               :statement="statement"
               v-on:remove="removeStatement(statement)">
    </Statement>
  </div>

  <button class="button add-button" @click="addStatement">
    + add statement filter
  </button>

  <ColumnSelector :subject="subject"></ColumnSelector>
</div>
</template>

<script>
import StatementComponent from './Statement.vue'
import ColumnSelector from './ColumnSelector.vue'
import Statement from '../queryBuilder/Statement'

export default {
  props: ['subject'],

  created() {
    if (this.statements.length === 0) {
      this.addStatement()
    }

    this.nextStatementNumber = this.getNextStatementNumber()
  },

  data() {
    return {
      nextStatementNumber: null // intialized in created()
    }
  },

  methods: {
    addStatement() {
      this.$store.commit({
        type: 'addStatement',
        subject: this.subject,
        statement: new Statement(this.subject + '_s_' + this.nextStatementNumber)
      })
      this.nextStatementNumber++
    },

    removeStatement(statement) {
      this.$store.commit({
        type: 'removeStatement',
        subject: this.subject,
        statement
      })
    },

    /**
     * This is needed when statements are imported from the URL
     */
    getNextStatementNumber() {
      const statementIds = Object.keys(this.statements)

      if (statementIds.length === 0) return 0

      const idNums = statementIds.map(id => parseInt(id.match(/\d+$/)[0]))
      return Math.max(...idNums) + 1
    }
  },

  computed: {
    statements() {
      return this.$store.state.statementTriples[this.subject] || []
    }
  },

  components: {
    Statement: StatementComponent,
    ColumnSelector
  }
}
</script>

<style lang="scss">
@import "../style/main.scss";

.add-button.button {
  color: $blue;
}
</style>
