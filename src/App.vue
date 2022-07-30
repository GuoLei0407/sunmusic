<template>
  <div id="app">
    <top></top>
    <musicmain></musicmain>
  </div>
</template>

<script>
import top from './components/top.vue'
import musicmain from './components/musicMain.vue'
export default {
  components: {
    top,
    // eslint-disable-next-line vue/no-unused-components
    musicmain
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
