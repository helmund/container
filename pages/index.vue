<template>
  <div class="container px-4">
    <h1 class="title text-center text-6xl font-thin my-5">
      {{ resultCount }} Glascontainer in Leizig
    </h1>
    
    <div class="relative map-container overflow-hidden">
      <here-map
        apiKey="4aRSOHXAoxOVRtiW4HXjt0lI3iWFbdiDfL0fdkbXF-w"
        ref="map"
        :latitude="latitude"
        :longitude="longitude"
        :zoom="12">
      </here-map>
      <div class="absolute inset-0 bg-gray-100 opacity-75" v-if="showBlocker"></div>
      <div class="absolute inset-0 flex items-center justify-center" v-if="showBlocker">
        <div>
          <button @click="locateUser" class="mx-1 bg-blue-800 hover:bg-blue-900 text-white px-2 py-2 px-2 rounded tracking-wide">
            Container in meiner Nähe
          </button>
          <button @click="showAllMarker" class="mx-1 bg-teal-800 hover:bg-teal-900 text-white py-2 px-2 rounded tracking-wide">
            Alle Container anzeigen
          </button>
        </div>
      </div>
    </div>


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
import hereMap from '~/components/here-map.vue'
import { reject } from 'q';

export default {
  data: function() {
    return {
      location: null,
      gettingLocation: false,
      errorStr: null,
      info: null,
      latitude: Number,
      longitude: Number,
      showAll: false,
      showBlocker: true
    }
  },
  props: {
  },

  components: {
    rowItem,
    hereMap
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

    showAllMarker() {
      this.showAll = true;
      this.showBlocker = false;
      let map = this.$refs.map;
      console.log('showAllMarker')
      if (this.showAll == true ) {
        for (var i = 0; i < this.items.length; i++) {
            map.dropMarker(this.items[i].street + " " + this.items[i].street_number + ", " + this.items[i].postcode + " Leipzig, DEU")
          }
        } else {
          console.log('false')
        }
    },

    async locateUser() {
      this.gettingLocation = true;

      try {
        this.gettingLocation = false;
        this.location = await this.getLocation();
        this.latitude = this.location.coords.latitude;
        this.longitude = this.location.coords.longitude;
        this.showBlocker = false;
        this.showAllMarker();
      } catch(e) {
        this.gettingLocation = false;
        this.errorStr = e.message;
      }
    }
  },
  mounted() {
    // let map = this.$refs.map;
    // if (this.showAll == true ) {
    //   console.log('true')
    //   for (var i = 0; i < this.items.length; i++) {
    //       map.dropMarker(this.items[i].street + " " + this.items[i].street_number + ", " + this.items[i].postcode + " Leipzig, DEU")
    //     }
    //   } else {
    //     console.log('false')
    //   }
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
