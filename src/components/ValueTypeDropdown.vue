<template>
<div class="value-type dropdown" :class="{ 'is-active': isActive }">
  <div class="dropdown-trigger">
    <button class="button" :disabled="!visible" @click="isActive = !isActive">
      <span>{{valueType.label}}</span>
      <span class="icon is-small">
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu">
    <div class="dropdown-content">
      <a v-for="vtype in valueTypes" class="dropdown-item" :class="{'is-active': vtype === valueType}" @click="select(vtype)">
        <p class="dropdown-item-label">{{vtype.label}}</p>
        <p class="dropdown-item-description">{{vtype.description}}</p>
      </a>
    </div>
  </div>
</div>
</template>

<script>
import valueTypes from '../queryBuilder/valueTypes'

export default {
  props: ['valueType', 'visible'],

  data() {
    return {
      valueTypes,
      isActive: false
    }
  },

  methods: {
    select(type) {
      this.$emit('update:valueType', type)
      this.isActive = false
    }
  }
}
</script>

<style lang="scss">
.value-type.dropdown {
  width: 100%;
  .dropdown-trigger, .button {
    width: 100%;
  }
}
</style>
