<template>
  <b-card class="row">
    <b-card-title>Astronomy Picture of the Day</b-card-title>
    <div class="row">

      <div class="col-xs-6 mr-auto ml-4 text-left">
        <div v-if="picture">
          <p><strong>Tittle:</strong> {{ this.picture.title }}</p>
          <p><strong>Copyright:</strong> {{ this.picture.copyright }}</p>
          <div v-if="picture.media_type==='image'">
            <b-card-img @click="openImage" class="w-75" :src="this.picture.url"></b-card-img>
          </div>
          <div v-if="picture.media_type==='video'">
            <figure class="w-75">
              <iframe width="800" height="500" :src="this.picture.url"></iframe>
            </figure>
          </div>
        </div>
        <div v-if="!picture">
          No data found.
        </div>
      </div>
      <div class="col-xs-6 mr-5 mt-5">
        <b-calendar width="90px" v-model="dateValue" @context="onContext" :max="max" locale="en"></b-calendar>
      </div>
      <div v-if="picture">
        <p class="mt-3 mr-5 ml-4 text-justify">{{ this.picture.explanation }}</p>
      </div>
    </div>
  </b-card>
</template>

<script>
import {getApod} from "../api/apod";

export default {
  name: "Apod",
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    const maxDate = today.toISOString().split('T')[0]
    return {
      picture: {},
      max: maxDate,
      dateValue: new Date().toISOString().split('T')[0]
    }
  },
  async fetch() {
    this.picture = await getApod()
    if (this.picture)
      this.dateValue = new Date(this.picture.date)
  },
  methods: {
    async onContext(ctx) {
      this.picture = await getApod(new Date(this.dateValue));
    },
    openImage() {
      if (this.picture.hdurl)
        window.open(this.picture.hdurl, '_blank');
    }
  }
}
</script>

<style scoped>

</style>
