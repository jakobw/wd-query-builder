<template>
<div class="column-selector builder-box">
  <h5 class="title is-5">
    <a @click="expanded = !expanded">[{{ expanded ? '-' : '+' }}]</a>
    Result columns
  </h5>
  <div v-show="expanded" class="fields">
    <div class="field is-grouped">
      <p class="control">
        <label class="button checkbox">
          <input type="checkbox" checked>
          item id
        </label>
      </p>

      <p class="control">
        <label class="button checkbox">
          <input type="checkbox" checked>
          item label
        </label>
      </p>
    </div>

    <div class="field">
      <div class="control">
        <MultiSelect
          :options="properties"
          v-model="selectedProperties"
          :multiple="true"
          :close-on-select="false"
          :internal-search="false"
          placeholder="Select properties"
          @search-change="getOptions"
          @input="updateSelectedColumns">
          <template slot="option" scope="props">
            <span class="dropdown-item-label">{{ props.option.label }}</span>
            <span class="dropdown-item-description">{{ props.option.description }}</span>
          </template>

          <template slot="tag" scope="props">
            <span class="selected">
              {{ props.option.label }}
            </span>
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
      isLoading: false,
      expanded: false
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

  .title {
    margin-bottom: 0;
  }
  .fields {
    margin-top: 15px;
  }

  .multiselect {
    .multiselect__tags {
      border-radius: $input-radius;
      border-color: $input-border-color;
      box-shadow: $input-shadow;

      input {
        margin-bottom: 0;
      }
    }

    .multiselect__option--highlight {
      background: $primary;
    }

    .selected {
      border-radius: 2px;
      padding: 2px;
      margin: -2px 2px 0 0;
      display: inline-block;
      border: 1px solid $grey-lighter;
    }
  }
}
</style>
