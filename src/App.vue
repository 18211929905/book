<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const getters = {
  a:function(){
    return 1
  },
  b:function(){
    return 2
  }
};
function fn(keys) {
  console.log(getters)
  const data = {}
  keys.forEach(key => {
    if(getters.hasOwnProperty(key)){
      data[key] = getters[key]
    }
  });
  return data
}
export default {
  computed: {
    ...fn(["a", "b"]),
    ...mapGetters(["test"])
  },
  mounted() {
    // this.$store.dispatch("setTest", 10).then(() => {
    //   console.log(this.test);
    // });
    console.log(this.a,this.b);
  }
};
</script>

<style>
</style>
