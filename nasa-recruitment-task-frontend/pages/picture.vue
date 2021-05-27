<template>
  <div class="row justify-content-center">
    <div class="card-container">
      <MarsGallery/>
    </div>
  </div>
</template>

<script>
import MarsGallery from "../components/MarsGallery";
export default {
  name: "pictureGallery",
  components: {MarsGallery}
}
</script>

<style scoped>
.card-container {
  max-width: 90%;
  min-width: 30%;
  margin-top: 15px;
  margin-bottom: 150px;
}

</style>
