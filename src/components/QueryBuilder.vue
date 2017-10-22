<template>
<div class="query-builder">
  <div class="statements">
    <Statement v-for="(statement, index) in statements"
               :key="statement.id"
               v-on:remove="statements.splice(index, 1)">
    </Statement>
  </div>
  <button class="button add-button" @click="addStatement">
    + add statement
  </button>
</div>
</template>

<script>
import Statement from './Statement.vue'

export default {
  created() {
    this.addStatement()
  },

  mounted() {
    this.$el.querySelector('input').focus()
  },

  data() {
    return {
      nextId: 0,
      statements: []
    }
  },

  methods: {
    addStatement() {
      this.statements.push({ id: this.nextId }) // TODO: make statement component hold statement objects
      this.nextId++
    }
  },

  components: {
    Statement
  }
}
</script>

<style lang="scss">
.query-builder {
  margin-top: 20px
}

.statements {
  margin-top: 20px
}
.add-button {
  margin-top: 20px
}
</style>
