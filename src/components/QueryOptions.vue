<template>
<div class="builder-box query-options">
  <h5 class="title is-5">
    <a @click="expanded = !expanded">[{{ expanded ? '-' : '+' }}]</a>
    Query Options
  </h5>

  <div class="columns" v-show="expanded">
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
  data() {
    return {
      expanded: false
    }
  },

  components: {
    LimitQuery
  }
}
</script>

<style lang="scss">
.query-options {
  .title {
    margin-bottom: 0;
  }
  .columns {
    margin-top: 0px;
  }

  margin-top: 20px
}
</style>
