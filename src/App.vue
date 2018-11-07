<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
};
</script>

<style scoped>
  #app{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
