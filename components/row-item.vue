<template>
  <li class="py-2 px-4 flex border-solid border border-b-0 flex-wrap hover:bg-gray-100">
    <span class="w-full md:w-4/12">
      {{ item.street }}
      {{ item.street_number }}
    </span>
    <span class="w-full md:w-4/12">{{ item.description }}</span>
    <span class="w-full md:w-4/12">
      {{ item.postcode }}
      <router-link :to="`/stadtteile/${item.districtId}`" class="text-blue-600 hover:font-bold">{{ item.district }}</router-link>
    </span>
    <!-- https://www.google.com/maps/dir/?api=1&destination=Könneritzstraße+04229+Schleußig&travelmode=walking -->
  </li>
</template>

<script>
export default {
  name: 'row-item',

  props: {
    item: Object
  }
}
</script>
