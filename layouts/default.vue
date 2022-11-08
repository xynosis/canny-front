<template lang="pug">
div.canny-dark.vh-100
  Nav
  Nuxt
  Footer
</template>

<script>
import Nav from '../components/Nav.vue'
import Footer from '../components/Footer.vue'

import Vue from 'vue'
import medusaMix from '~/mixins/medusa.js'
import htmlMix from '~/mixins/html.js'

Vue.mixin(medusaMix)
Vue.mixin(htmlMix)
export default {
  components: { 
    Nav, Footer
  
  }
}
</script>

<style lang='scss'>
body{
  font-family: 'Brandon Grotesque';
}

.font-canny-yellow{
    color: $yellow;
}
.font-canny-dark{
  color: $dark;
}
.canny-dark {
    background-color: $dark;
}
.canny-yellow {
    background-color: $yellow;
}
.canny-header {
    font-family: 'Fairwater Sans';
    font-weight: 500;
}
.canny-logo-serif {
    font-family: 'Fairwater Open Serif';
}
.canny-logo-script {
    font-family: 'Fairwater Script';
}

.canny-light {
  background-color: $light;
}

html {
  background-color: $dark;
}
</style>