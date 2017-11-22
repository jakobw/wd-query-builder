<template>
<div class="builder-box query-options">
  <h5 class="title is-5">
    <a @click="expanded = !expanded">
      <i class="fa" :class="{ 'fa-caret-right': !expanded, 'fa-caret-down': expanded }"></i>
      Query Options
    </a>
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
            <select disabled>
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
@import "../style/main";

.query-options {
  .title.is-5 {
    margin-bottom: 0;

    a {
      color: $title-color;
    }
  }

  .columns {
    margin-top: 0px;
  }

  margin-top: 10px
}
</style>
