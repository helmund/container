<template>
  <div class="container">
    <h1 class="title text-center text-6xl font-thin my-5">
      Glascontainer in Leizig
    </h1>
    <div class="py-3 px-4 flex sticky top-0 bg-gray-100 font-bold">
      <span class="w-4/12">Anschrift</span>
      <span class="w-4/12">Beschreibung</span>
      <span class="w-4/12">Stadtteil</span>
    </div>
    <ul>
      <row-item v-for="item in items" :key="item" v-bind:item="item"></row-item>
    </ul>
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
  onDownloadProgress(progressEvent) {
    // const loading = true
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
