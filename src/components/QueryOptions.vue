<template>
<div class="builder-box query-options">
  <div class="columns">
    <div class="column">
      <LimitQuery></LimitQuery>
    </div>

    <div class="column">
      <div class="field">
        <label class="label">Order by</label>
        <div class="control">
          <div class="select">
            <select>
              <option>label</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import LimitQuery from './LimitQuery.vue'

export default {
  components: {
    LimitQuery
  }
}
</script>

<style lang="scss">
.query-options {
  margin-top: 20px
}
</style>
