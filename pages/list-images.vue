<template>
    <div>
        <div v-for="item in items" :key="item" :item="item">
            {{item.street}} {{item.street_number}} {{item.postcode}} Leipzig
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import rowItem from '~/components/row-item.vue'

export default {
  props: {
    loading: {
      default: true,
      type: Boolean
    }
  },

  components: {
    rowItem  
  },
  async asyncData() {
    const { data } = await axios.get('/list.json')
    return { items: data }
  },
  
  computed: {
    resultCount() {
      return this.items && this.items.length
    }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
