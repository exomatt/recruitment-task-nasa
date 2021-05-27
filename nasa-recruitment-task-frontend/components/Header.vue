<template>
  <div >
    <b-navbar class="navbar"  type="dark" variant="dark">
      <b-navbar-brand href="/">Nasa Data</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/apod">Astronomy Picture of the Day</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.navbar {
  min-width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: 0px;
}
</style>
