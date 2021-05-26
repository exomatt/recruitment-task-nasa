<template>
  <div class="container">
    <Header/>
    <h2 v-if="weather">{{ weather.terrestrial_date }}</h2>
    <button v-on:click="fetch">Refresh</button>
    <Weather/>
  </div>
</template>

<script>
import Header from "../components/Header";
import {getWeather} from "../api/weather";
import Weather from "../components/Weather";

export default {
  components: {Weather, Header},
  data() {
    return {
      weather: {}
    }
  },
  methods: {
    async fetch() {
      this.weather = await getWeather()
    }
  }
}
</script>

<style>
.container {
  text-align: center;
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 100%;
  overflow: auto !important;
  overflow-y: scroll !important;
}
</style>
