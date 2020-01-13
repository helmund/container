<template>
  <div class="container px-4">
    <h1 class="title text-center text-6xl font-thin my-5">
      {{ resultCount }} Glascontainer in Leizig
    </h1>

    <!-- <button @click="locateUser"> Hier klicken </button>

    <button @click="getLatLong">asdadas</button>

    <div v-if="location">
      {{location.coords.latitude}} {{location.coords.longitude}}
    </div>

      <div v-if="errorStr">
        Sorry, but the following error
        occurred: {{errorStr}}
      </div> -->


    <div class="py-3 px-4 sticky top-0 bg-gray-100 font-bold hidden md:flex">
      <span class="w-4/12">Anschrift</span>
      <span class="w-4/12">Beschreibung</span>
      <span class="w-4/12">Stadtteil</span>
    </div>
    <ul>
      <row-item v-for="(item, index) in items" :key="index" :item="item"></row-item>

      <!-- <li v-for="(infoItem, index) in info" :key="index">
        lat: {{infoItem.results}} <br/>
        lng: {{infoItem.results}} <br/>
      </li> -->
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import rowItem from '~/components/row-item.vue'
import { reject } from 'q';

export default {
  data: function() {
    return {
      location: null,
      gettingLocation: false,
      errorStr: null,
      info: null
    }
  },
  props: {
  },

  components: {
    rowItem
  },
  async asyncData() {
    const { data } = await axios.get('/list.json')
    return { items: data };
  },

  head() {
    return {
      title: this.items.length + ' Altglas und Glascontainer in Leizig',
      meta: [
        { hid: 'og:title', name: 'og:title', content: this.items.length + ' Altglas und Glascontainer in Leizig' },
        { hid: 'og:site_name', name: 'og:site_name', content: 'Altglas und Glascontainer in Leizig' },
        { hid: 'description', name: 'description', content: 'Es gibt  ' + this.items.length + ' Altglas und Glascontainer in Leipzig. Finde den in deiner Nähe, sortiert nach Stadtteilen und Postleitzahl!' },
        { hid: 'og:description', name: 'og:description', content: 'Es gibt  ' + this.items.length + ' Altglas und Glascontainer in Leipzig. Finde den in deiner Nähe, sortiert nach Stadtteilen und Postleitzahl!' },
      ]
    }
  },
  
  computed: {
    resultCount() {
      return this.items && this.items.length
    }
  },

  methods: {
    async getLocation() {
      return new Promise((resolve, reject) => {

        if(!("geolocation" in navigator)) {
          reject(new Error('geht nicht'));
        }

        navigator.geolocation.getCurrentPosition(pos => {
          resolve(pos);
        }, err => {
          reject(err);
        })

      })
    },

    async locateUser() {
      this.gettingLocation = true;

      try {
        this.gettingLocation = false;
        this.location = await this.getLocation();
        console.log(this.location);
      } catch(e) {
        this.gettingLocation = false;
        this.errorStr = e.message;
      }
    },

    // async getLatLong() {
    //   this.items.forEach(item => {
    //     axios
    //       .get(`https://maps.googleapis.com/maps/api/geocode/json?new_forward_geocoder=true&address=${item.street}+${item.district}+Leipzig&key=AIzaSyBQhWVUEmKhoSWt6jgazOm_NhaL84WX78g`)
    //       .then(response => this.info = response)
    //       .then(test())
    //   });
    // }

    // function getDistance(currentLocation, location) {
    //   var distance = Math.sqrt((currentLocation.coords.latitude - location.latitude)^2 + (currentLocation.coords.longitutde - location.longitude)^2);
    //   return distance;
    // }
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
