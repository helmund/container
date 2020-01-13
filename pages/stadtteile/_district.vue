<template>
  <div class="container px-4">
    <a @click="$router.go(-1)" class="my-4 block cursor-pointer text-blue-600 hover:font-bold">Zurück</a>
    <h1 class="title text-center text-4xl md:text-6xl font-light my-5">
      {{ resultCount }} Glascontainer in <span class="capitalize">{{ currentDistrict }}</span>
    </h1>
    <div class="flex flex-wrap -mx-4">
      <container-card v-for="(item, index) in items" :key="index" :item="item" v-if="item.districtId == currentDistrict"></container-card>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import containerCard from '~/components/container-card.vue'

export default {
  props: {
    district: String
  },

  components: {
    containerCard
  },
  
  created() {
    var _district = this.$route.params.district;
    this.currentDistrict = _district;
  },
  async asyncData(district) {
    const districtJson = "/districts/" + district.params.district + ".json";
    const { data } = await axios.get(districtJson)
    return { items: data }
  },

  head() {
    return {
      title: this.items.length + ' Glascontainer in ' + this.district + ' - Leipzig',
      meta: [
        { hid: 'og:title', name: 'og:title', content: this.items.length + ' Glascontainer in ' + this.district + ' - Leipzig' },
        { hid: 'og:site_name', name: 'og:site_name', content: 'Glascontainer in Leizig' },
        { hid: 'description', name: 'description', content: 'Es gibt  ' + this.items.length + ' Glascontainer in ' + this.district + ' - Leipzig. Finde den in deiner Nähe, sortiert nach Stadtteilen und Postleitzahl!' },
        { hid: 'og:description', name: 'og:description', content: 'Es gibt  ' + this.items.length + ' Glascontainer in ' + this.district + ' - Leipzig. Finde den in deiner Nähe, sortiert nach Stadtteilen und Postleitzahl!' },
      ]
    }
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
  line-height: 1;
}

.capitalize {
  text-transform: capitalize;
}
</style>
