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
    + add statement
  </button>
</div>
</template>

<script>
import StatementComponent from './Statement.vue'
import Statement from '../wikidata/Statement'

export default {
  props: ['subject'],

  created() {
    this.addStatement()
  },

  mounted() {
    this.$el.querySelector('input').focus()
  },

  data() {
    return {
      nextId: 0
    }
  },

  methods: {
    addStatement() {
      this.$store.commit({
        type: 'addStatement',
        subject: this.subject,
        statement: new Statement(this.nextId)
      })
      this.nextId++
    },

    removeStatement(statement) {
      this.$store.commit({
        type: 'removeStatement',
        subject: this.subject,
        statement
      })
    }
  },

  computed: {
    statements() {
      return this.$store.state.statementTriples[this.subject]
    }
  },

  components: {
    Statement: StatementComponent
  }
}
</script>

<style lang="scss">
.add-button {
  margin-top: 20px
}
</style>
