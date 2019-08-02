<template>
  <li class="py-2 px-4 flex border-solid border border-b-0">
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
</template>

<script>
export default {
  name: 'row-item',

  props: {
    item: Object
  }
}
</script>
