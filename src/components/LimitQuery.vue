<template>
<div class="limit-query">
  <label class="label">Number of results</label>
  <div class="field-body">
    <div class="field">
      <input class="input" v-model="limit" @change="updateLimit" maxlength="5" :disabled="showAll" placeholder="20">
    </div>
    <div class="field">
      <label class="checkbox">
        <input type="checkbox" v-model="showAll" @change="updateLimit">
        all results
      </label>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      limit: '',
      showAll: false
    }
  },

  created() {
    if (this.$store.state.limit === false) {
      this.showAll = true
    } else {
      this.limit = this.$store.state.limit || ''
    }
  },

  methods: {
    updateLimit() {
      this.$store.commit({
        type: 'updateLimit',
        limit: this.showAll ? false : this.limit
      })
    }
  }
}
</script>

<style lang="scss">
.checkbox { vertical-align: bottom; }
</style>
