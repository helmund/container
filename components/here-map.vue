<template>
  <div>
      <div class="absolute inset-0 w-full h-full" ref="map"></div>
  </div>
</template>

<script>
import config from '@/config'

export default {
  name: 'here-map',

  data: function() {
    return {
      platform: {},
      map: {},
      i: {},
      getGeocodingService: {}
    }
  },

  props: {
    apiKey: String,
    latitude: NaN,
    longitude: NaN,
    zoom: Number
  },
  created() {
    this.platform = new H.service.Platform({
      'apikey': this.apiKey
    });
    this.getGeocodingService = this.platform.getGeocodingService();
  },
  mounted() {
    var layers = this.platform.createDefaultLayers();
    var baseLayer = this.platform.getMapTileService({type: 'base'}).createTileLayer(
      'maptile',
      'reduced.day',
      256,
      'png'
    );
    this.map = new H.Map(
      this.$refs.map,
      layers.vector.normal.map,
      
      {
        center: {lat: 51.339695, lng: 12.373075},
        zoom: this.zoom,
      }
    );
    var events = new H.mapevents.MapEvents(this.map);
    var behavior = new H.mapevents.Behavior(events);
    var ui = H.ui.UI.createDefault(this.map, layers);
  },
  methods: {
      dropMarker(query) {
        this.getGeocodingService.geocode({
          searchText: query
        }, data => {
          if (data.Response.View.length > 0) {
            if (data.Response.View[0].Result.length > 0) {
              let position = data.Response.View[0].Result[0].Location.DisplayPosition;
              let marker = new H.map.Marker({ lat: position.Latitude, lng: position.Longitude});
              this.map.addObject(marker);
            }
          }
        }, error => {
          console.error(error)
        })
      }
  },
  watch: {
    latitude(lat) {
      this.latitude = lat
    },
    longitude(lng) {
      this.longitude = lng

      this.map.setCenter({ lat: this.latitude, lng: this.longitude });
      this.map.setZoom(15);
      var icon = new H.map.Icon( "/images/marker.svg" );
      let myPosition = new H.map.Marker( {lat: this.latitude, lng: this.longitude});
      this.map.addObject(myPosition);
    }
  }
}
</script>

<style lang="scss">
  .map-container {
    padding-bottom: percentage(8/16);
  }
</style>
