<template>
<div class="query-builder">
  <div class="statements">
    <Statement v-for="statement in statements"></Statement>
  </div>
  <button class="button add-button" @click="addNewStatement">
    + add statement
  </button>
</div>
</template>

<script>
import Statement from './Statement.vue'

export default {
  data() {
    return {
      statements: []
    }
  },

  methods: {
    addNewStatement() {
      this.statements.push({})
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
