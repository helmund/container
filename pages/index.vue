<template>
  <div class="container px-4">
    <div class="h-screen flex flex-col justify-center">
      <h1 class="font-highlight text-center text-6xl font-thin my-5 text-shadow" v-if="!showBlocker">
        {{ resultCount }} Glascontainer in Leipzig
      </h1>
      <div class="rounded" :class="{'shadow-xl': !showBlocker}">
        <div class="relative map-container overflow-hidden">
          <div :class="{'opacity-0': showBlocker}">
            <here-map
              apiKey="4aRSOHXAoxOVRtiW4HXjt0lI3iWFbdiDfL0fdkbXF-w"
              :latitude="latitude"
              :longitude="longitude"
              :zoom="12"
              ref="map">
            </here-map>
          </div>
          <div class="absolute inset-0 bg-powder-blue" v-if="showBlocker"></div>
          <div class="absolute inset-0 flex items-center justify-center" v-if="showBlocker">
            <div>
              <h1 class="font-highlight text-center text-6xl font-thin my-5 text-shadow">
                {{ resultCount }} Glascontainer in Leipzig
              </h1>
              <a href="#" @click="locateUser" class="mx-1 text-white px-2 py-2 tracking-wide text-shadow">
                → Container in meiner Nähe
              </a>
              <a href="#" @click="showAllMarker" class="mx-1 text-white py-2 px-2 rounded tracking-wide text-shadow">
                → Alle Container anzeigen
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="h-screen py-20">
      <div class="overflow-y-scroll overflow-x-hidden max-h-full bg-ghost-white text-eagle-green rounded shadow-md">
        <div class="py-3 px-4 sticky top-0 bg-gray-100 font-bold hidden md:flex shadow">
          <span class="w-4/12">Anschrift</span>
          <span class="w-4/12">Beschreibung</span>
          <span class="w-4/12">Stadtteil</span>
        </div>
        <ul>
          <row-item v-for="(item, index) in items" :key="index" :item="item"></row-item>
        </ul>
      </div>
    </div>
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
      var map = this.$refs.map;
      console.log(this.$refs.map)
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
        // var coords =  { lat: this.latitude, lng: this.longitude };
        // this.findNearestMarker(coords);
      } catch(e) {
        this.gettingLocation = false;
        this.errorStr = e.message;
      }
    },
    // findNearestMarker(coords) {
    //     var minDist = 10000000000,
    //         nearest_text = '*None*',
    //         nearest_pos,
    //         markerDist,
    //         // get all objects added to the map
    //         objects = this.$refs.map.getObjects(),
    //         len = this.$refs.map.getObjects().length,
    //         i,
    //         k;
    //     console.log(objects, len)

    //     // iterate over objects and calculate distance between them
    //     for (i = 0; i < len; i += 1) {
    //         var obj = objects[i];
    //         if (obj && obj instanceof H.map.Group) {
    //             var objs = obj.getObjects();
    //             var objslen = objs.length;
    //             for (k = 0; k < objslen; k += 1) {
    //                 markerDist = objs[k].getGeometry().distance(coords);
    //                 if (markerDist < minDist) {
    //                     minDist = markerDist;
    //                     nearest_text = objs[k].getData();
    //                     nearest_pos = { lat: objs[k].getGeometry().lat, lng: objs[k].getGeometry().lng };
    //                 }
    //             }
    //             break;
    //         }
    //     }


    //     console.log('The nearest marker is: ' + nearest_text);
    // }
  },
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
