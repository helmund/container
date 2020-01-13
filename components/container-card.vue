<template>
  <div class="p-2 w-full md:w-6/12 lg:w-4/12">
      <div class="border-solid border p-2 pb-4 font-sans font-thin text-sm rounded shadow hover:shadow-md h-full card">
          <div class="-mx-2 -mt-2 mb-4 hidden md:block">
            <a :href="`https://www.google.com/maps/dir/?api=1&origin=51.3136371,12.370702&destination=${item.street}+${item.street_number}+${item.postcode}&travelmode=walking`" 
                target="_blank" :title="`Weg zur ${item.street} ${item.street_number} ${item.postcode}`">
              <img :src="`https://maps.googleapis.com/maps/api/staticmap?center=${item.street}+${item.street_number}+${item.postcode}+${item.disctrict}&zoom=14&size=400x150&maptype=roadmap&markers=color:red%7C%7C${item.street}+${item.street_number}+${item.postcode}+${item.disctrict}&key=${mapsKey}`"
                  class="w-full hidden md:block" />
            </a>
          </div>
          <div class="flex">
              <div class="w-10/12">
                <div class="mb-2">
                  <div class="text-xs font-normal text-gray-500">Adresse</div>
                  {{ item.street }} {{ item.street_number }}<br />
                  {{ item.postcode }} {{ item.district }}
                </div>
                <div v-if="item.description">
                    <div class="text-xs font-normal text-gray-500">Beschreibung</div>
                        {{ item.description }}
                    </div>
              </div>
              <div class="w-2/12 flex justify-center items-center card__direction">
                <a :href="`https://www.google.com/maps/dir/?api=1&destination=${item.street}+${item.street_number}+${item.postcode}&travelmode=walking`" 
                    target="_blank" :title="`Weg zur ${item.street} ${item.street_number} ${item.postcode}`">
                    <img src="https://cdn3.iconfinder.com/data/icons/map/500/way-512.png" width="30" />
                </a>
              </div>
          </div>
      </div>
    <!-- https://www.google.com/maps/dir/?api=1&destination=Könneritzstraße+04229+Schleußig&travelmode=walking -->
  </div>
</template>

<script>
import config from '@/config'

export default {
  name: 'container-card',

  data: function() {
    return {
      mapsKey: config.maps.secret,
    }
  },

  props: {
    item: Object,
  }
}
</script>

<style lang="scss">
@media (min-width: 768px) {
  .card__direction {
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
  }
  .card:hover .card__direction {
      opacity: 1;
  }
}
</style>
