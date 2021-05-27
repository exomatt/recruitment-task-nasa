<template>
    <div class="row justify-content-center">
      <div class="card-container">
      <Apod/>
      </div>
    </div>
</template>

<script>
export default {
  name: "apod"
}
</script>

<style scoped>

.card-container {
  max-width: 80%;
  min-width: 30%;
  margin-top: 15px;
  margin-bottom: 150px;
}

</style>
