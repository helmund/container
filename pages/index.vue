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
      <li
        v-for="(item, index) in items"
        :key="item"
        class="py-2 px-4 flex"
        :class="{ 'bg-gray-200': index % 2 !== 0 }"
      >
        <span class="w-4/12">
          {{ item.street }}
          {{ item.street_number }}
        </span>
        <span class="w-4/12">{{ item.description }}</span>
        <span class="w-4/12">
          {{ item.postcode }}
          {{ item.district }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import axios from 'axios'

export default {
  async asyncData() {
    const { data } = await axios.get('/list.json')
    return { items: data }
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
