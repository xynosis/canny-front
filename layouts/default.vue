<template lang="pug">
div.canny-dark
  Nav
  Nuxt.h-100
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