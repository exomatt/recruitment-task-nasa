<template>
  <b-card class="row">
    <div class="w-50 text-light d-flex justify-content-between mb-3">
      <b-calendar v-model="value" :min="min" :max="max" locale="en"></b-calendar>
    </div>
  </b-card>
</template>

<script>
import {getWeather} from "../api/weather";

export default {
  name: "Weather",
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const maxDate = new Date(today)
    return {
      weather: {},
      max: maxDate
    }
  },
  async fetch() {
    this.weather = await getWeather()
  }
}
</script>

<style scoped>

</style>
