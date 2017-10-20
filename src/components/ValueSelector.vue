<template>
<div class="field has-addons">
  <p class="control">
    <button class="button is-static" :disabled="visible">Value</button>
  </p>
  <p class="control is-expanded">
    <input class="input" :disabled="visible">
  </p>
</div>
</template>

<script>
export default {
  props: ['visible']
}
</script>

<style lang="css">
</style>
