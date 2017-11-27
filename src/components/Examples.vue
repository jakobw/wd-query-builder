<template>
<div class="examples dropdown" :class="{ 'is-active': isActive }">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="examples-dropdown" @click="isActive = !isActive">
      <span>Examples</span>
      <span class="icon is-small">
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="examples-dropdown" role="menu">
    <div class="dropdown-content">
      <a :href="url + '?query=%7B%22statements%22:%7B%22item%22:%7B%22item_s_0%22:%7B%22property%22:%7B%22id%22:%22P31/wdt:P279*%22,%22label%22:%22instance%20of%22%7D,%22value%22:%7B%22id%22:%22Q8072%22,%22label%22:%22volcano%22%7D%7D,%22item_s_1%22:%7B%22property%22:%7B%22id%22:%22P17%22,%22label%22:%22country%22%7D,%22value%22:%7B%22id%22:%22Q189%22,%22label%22:%22Iceland%22%7D%7D%7D%7D,%22qualifiers%22:%7B%7D,%22select%22:%7B%22item%22:%7B%22id%22:true,%22label%22:true,%22properties%22:%5B%7B%22id%22:%22P18%22,%22label%22:%22image%22%7D,%7B%22id%22:%22P2044%22,%22label%22:%22elevation%20above%20sea%20level%22%7D%5D%7D%7D,%22limit%22:%22%22%7D'" class="dropdown-item">
        List of volcanoes in Iceland
      </a>
      <a :href="url + '?query=%7B%22statements%22:%7B%22item%22:%7B%22item_s_0%22:%7B%22property%22:%7B%22id%22:%22P279%7Cwdt:P279*%22,%22label%22:%22subclass%20of%22%7D,%22value%22:%7B%22id%22:%22Q2095%22,%22label%22:%22food%22%7D%7D,%22item_s_1%22:%7B%22property%22:%7B%22id%22:%22P487%22,%22label%22:%22Unicode%20character%22%7D,%22value%22:%7B%22object%22:%22item_s_1%22,%22id%22:%22X2%22,%22label%22:%22any%22%7D%7D%7D%7D,%22qualifiers%22:%7B%7D,%22select%22:%7B%22item%22:%7B%22id%22:true,%22label%22:true,%22properties%22:%5B%7B%22id%22:%22P487%22,%22label%22:%22Unicode%20character%22%7D%5D%7D%7D,%22limit%22:false%7D'" class="dropdown-item">
        List of food items with unicode characters
      </a>
      <a :href="url + '?query=%7B%22statements%22:%7B%22item%22:%7B%22item_s_0%22:%7B%22property%22:%7B%22id%22:%22P31/wdt:P279*%22,%22label%22:%22instance%20of%22%7D,%22value%22:%7B%22id%22:%22Q515%22,%22label%22:%22city%22%7D%7D,%22item_s_1%22:%7B%22property%22:%7B%22id%22:%22P6%22,%22label%22:%22head%20of%20government%22%7D,%22value%22:%7B%22object%22:%22item_s_1%22,%22id%22:%22X1%22,%22label%22:%22any%20item%20matching...%22%7D%7D%7D,%22item_s_1%22:%7B%22item_s_1_s_0%22:%7B%22property%22:%7B%22id%22:%22P21%22,%22label%22:%22sex%20or%20gender%22%7D,%22value%22:%7B%22id%22:%22Q6581072%22,%22label%22:%22female%22%7D%7D%7D%7D,%22qualifiers%22:%7B%7D,%22select%22:%7B%22item%22:%7B%22id%22:true,%22label%22:true,%22properties%22:%5B%7B%22id%22:%22P1082%22,%22label%22:%22population%22%7D%5D%7D%7D,%22limit%22:%22%22%7D'" class="dropdown-item">
        List of female mayors
      </a>
      <a :href="url + '?query=%7B%22statements%22:%7B%22item%22:%7B%22item_s_0%22:%7B%22property%22:%7B%22id%22:%22P31/wdt:P279*%22,%22label%22:%22instance%20of%22%7D,%22value%22:%7B%22id%22:%22Q515%22,%22label%22:%22city%22%7D%7D,%22item_s_1%22:%7B%22property%22:%7B%22id%22:%22P1376%22,%22label%22:%22capital%20of%22%7D,%22value%22:%7B%22object%22:%22item_s_1%22,%22id%22:%22X1%22,%22label%22:%22any%20item%20matching...%22%7D%7D%7D,%22item_s_1%22:%7B%22item_s_1_s_0%22:%7B%22property%22:%7B%22id%22:%22P31%22,%22label%22:%22instance%20of%22%7D,%22value%22:%7B%22id%22:%22Q6256%22,%22label%22:%22country%22%7D%7D,%22item_s_1_s_1%22:%7B%22property%22:%7B%22id%22:%22P30%22,%22label%22:%22continent%22%7D,%22value%22:%7B%22id%22:%22Q46%22,%22label%22:%22Europe%22%7D%7D%7D%7D,%22qualifiers%22:%7B%7D,%22select%22:%7B%7D,%22limit%22:false%7D'" class="dropdown-item">
        List of European capitals
      </a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      url: window.location.origin + window.location.pathname,
      isActive: false
    }
  }
}
</script>

<style lang="scss">
</style>
