<template>
  <b-card class="row">
    <b-card-title>Astronomy Picture of the Day</b-card-title>
    <div class="row">

      <div class="col-xs-6 mr-5 mt-5 ml-4 text-left">
        <p><strong>Camera Name :</strong>
          <b-form-select v-model="selectedCamera" :options="cameraNames"></b-form-select>
        </p>
        <p><strong>Rover Name :</strong>
          <b-form-select v-model="selectedRover" :options="roverNames"></b-form-select>
        </p>
        <b-btn @click="clearFilters"> Clear filter</b-btn>
        <b-btn @click="dateFilter"> Date filter</b-btn>
        <b-btn @click="otherFilter"> Other filter</b-btn>
        <b-btn @click="allFilter"> All filter</b-btn>
      </div>
      <div class="col-xs-6 mr-5">
        <b-calendar width="90px" v-model="dateValue" :max="max" locale="en"></b-calendar>
      </div>
    </div>
    <div class="mt-5" v-if="pictures.length>0">
      <b-btn @click="sortDesc"> Sort Descending</b-btn>
      <b-btn @click="sortAsc"> Sort Ascending</b-btn>
    </div>
    <div class="gallery" v-if="pictures.length>0">
      <div class="gallery-panel" v-for="picture in pictures" :key="pictures._id">
        <img :src="picture.img_src" @click="openImage(picture)">
      </div>
    </div>
    <div v-if="pictures.length===0">
      No data found.
    </div>
  </b-card>
</template>

<script>


import {getCameraNames, getPictures, getRoverNames} from "../api/picture";

export default {
  name: "MarsGallery",
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    const maxDate = today.toISOString().split('T')[0]
    return {
      pictures: [],
      roverNames: [],
      cameraNames: [],
      max: maxDate,
      dateValue: new Date().toISOString().split('T')[0],
      selectedCamera: null,
      selectedRover: null,
    }
  },
  async fetch() {
    this.roverNames = await getRoverNames()
    this.cameraNames = await getCameraNames()
    this.pictures = await getPictures({earth_date: this.dateValue});
  },
  methods: {
    clearFilters() {
      this.selectedCamera = null;
      this.selectedRover = null;
      this.dateValue = new Date().toISOString().split('T')[0];
      this.pictures=[];
    },
    async dateFilter() {
      let filter = {}
      if (this.dateValue)
        filter = {earth_date: this.dateValue, ...filter}
      this.pictures = await getPictures(filter);
    },
    async otherFilter() {
      let filter = {}
      if (this.selectedCamera)
        filter = {camera: this.selectedCamera}
      if (this.selectedRover)
        filter = {rover: this.selectedRover, ...filter}
      this.pictures = await getPictures(filter);
    },
    async allFilter() {
      let filter = {}
      if (this.selectedCamera)
        filter = {camera: this.selectedCamera}
      if (this.selectedRover)
        filter = {rover: this.selectedRover, ...filter}
      if (this.dateValue)
        filter = {earth_date: this.dateValue, ...filter}
      this.pictures = await getPictures(filter);
    },
    sortAsc(){
      this.pictures.sort(function compare(a, b) {
        return new Date(a.earth_date) - new Date(b.earth_date);
      });
    },
    sortDesc(){
      this.pictures.sort(function compare(a, b) {
        return new Date(b.earth_date) - new Date(a.earth_date);
      });
      console.log(this.pictures)
    },
    openImage(picture) {
      if (picture.img_src)
        window.open(picture.img_src, '_blank');
    }
  }
}
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 1rem;
  max-width: 80rem;
  margin: 5rem auto;
  padding: 0 5rem;
}

.gallery-panel img {
  width: 100%;
  height: 22vw;
  object-fit: cover;
  border-radius: 0.75rem;
}
</style>
