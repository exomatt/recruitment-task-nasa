<template>
    <div class="row justify-content-center">
      <div class="card-container">
        <Weather/>
      </div>
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
  overflow: hidden !important;
  overflow-y: scroll !important;
}

.card-container {
  max-width: 50%;
  min-width: 30%;
  margin-top: 15px;
  margin-bottom: 150px;
}
</style>
