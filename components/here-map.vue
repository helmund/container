<template>
  <div class="">
      <div ref="map" id="map-container" style="width:100%; height: 500px"></div>
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
    latitude(newVal, oldVal) {
      this.latitude = newVal
    },
    longitude(newVal, oldVal) {
      this.longitude = newVal

      this.map.setCenter({ lat: this.latitude, lng: this.longitude });
      this.map.setZoom(16);
    }
  }
}
</script>

<style lang="scss">

</style>
