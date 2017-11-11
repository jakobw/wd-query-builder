<template>
<div class="column-selector builder-box">
  <h5 class="title is-5">Result columns</h5>
  <div class="field is-grouped is-grouped-multiline">
    <p class="control">
      <label class="button checkbox is-small">
        <input type="checkbox" checked>
        item id
      </label>
    </p>

    <p class="control">
      <label class="button checkbox is-small">
        <input type="checkbox" checked>
        item label
      </label>
    </p>

    <div class="field is-small">
      <div class="control is-small">
        <MultiSelect
          :options="properties"
          v-model="selectedProperties"
          :searchable="true"
          :multiple="true"
          :internal-search="false"
          @search-change="getOptions"
          @input="updateSelectedColumns">
          <template slot="option" scope="props">
            <div class="option__desc">
              <span class="option__title">{{ props.option.label }}</span>
              <span class="option__small">{{ props.option.description }}</span>
            </div>
          </template>

          <template slot="tag" scope="props">
            {{ props.option.label }}
          </template>
        </MultiSelect>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import MultiSelect from 'vue-multiselect'
import { api } from '../api/newApi'
import PropertySearch from '../api/PropertySearch'
import Property from '../queryBuilder/Property'
import specialProperties from '../queryBuilder/specialProperties'

const propertySearch = new PropertySearch(api)

export default {
  props: ['subject'],

  data() {
    return {
      properties: [],
      selectedProperties: [],
      isLoading: false
    }
  },

  created() {
    const selectedColumns = this.$store.state.select[this.subject]
    if (selectedColumns) {
      this.selectedProperties = selectedColumns.properties
    }
  },

  methods: {
    getOptions(search, loading) {
      this.isLoading = true
      if (!search) {
        this.isLoading = false
        this.properties = []
        return
      }

      propertySearch.search(search)
        .then(data => {
          this.isLoading = false
          this.properties = data
        })
        .catch(error => {
          this.isLoading = false
          console.error('api error: ' + error) // TODO: show error to user
        })
    },

    updateSelectedColumns(properties) {
      this.$store.commit({
        type: 'updateSelectedProperties',
        subject: this.subject,
        properties: properties.map(p => ({ id: p.id, label: p.label }))
      })
    }
  },

  components: {
    MultiSelect
  }
}
</script>

<style lang="scss">
@import '../style/main';

.column-selector {
  margin-top: 10px;

  .multiselect {
  }
}
</style>
