<template>
  <b-card class="row">
    <b-card-title>Weather on Mars</b-card-title>
    <div class="row">
      <div class="col-xs-6 mr-auto ml-4 text-left">
        <div v-if="weather">
          <p><strong>Sol:</strong> {{ this.weather.sol }}</p>
          <p><strong>Season:</strong> {{ this.weather.season }}</p>
          <p><strong>Pressure:</strong> {{ this.weather.pressure }}</p>
          <p><strong>Max temperature:</strong> {{ this.weather.max_temp }}</p>
          <p><strong>Min temperature:</strong> {{ this.weather.min_temp }}</p>
          <p><strong>Sunrise:</strong> {{ this.weather.sunrise }}</p>
          <p><strong>Sunset:</strong> {{ this.weather.sunset }}</p>
        </div>
        <div v-if="!weather">
          No data found.
        </div>
      </div>
      <div class="col-xs-6 mr-5">
        <b-calendar width="90px" v-model="dateValue" @context="onContext" :max="max" locale="en"></b-calendar>
      </div>
    </div>
  </b-card>
</template>

<script>
import {getWeather} from "../api/weather";

export default {
  name: "Weather",
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    const maxDate = today.toISOString().split('T')[0]
    return {
      weather: {},
      max: maxDate,
      dateValue: new Date().toISOString().split('T')[0],
    }
  },
  async fetch() {
    this.weather = await getWeather()
    if(this.weather)
      this.dateValue = new Date(this.weather.terrestrial_date).toISOString().split('T')[0]
  },
  methods: {
    async onContext(ctx) {
      this.weather = await getWeather(new Date(this.dateValue));
    }
  }
}
</script>

<style scoped>
</style>
