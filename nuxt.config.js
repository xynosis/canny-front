

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Canny Goat Coffee',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [

      { rel: 'icon', type: 'image/x-icon', href: '/icon.svg' },
      {
        rel: 'stylesheet',
        href: "https://use.typekit.net/zcz0idm.css"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'tachyons/css/tachyons.css', '~assets/scss/colors.scss'
  ],
  target: 'static',
  generate: {
    fallback: true

  },



  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/swiper.js', '~plugins/upload.js', '~/plugins/clickOutside.js', { src: '~/plugins/cal.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios', '@nuxtjs/style-resources', 'nuxt-stripe-module',
  ],
  stripe: {
    //process.env.PUBLISHABLE_KEY abd add .env file
    // publishableKey: 'pk_test_51IG42bHYI4OuD4BxkIfFlFcNYmNA1NMQ4bUYAu0uWFRQbXdIpaI6nS1pRpmCXFYRJMA1G2qHEAjPtRgWWjkaIqp000QwFBOGKk', locale: 'en-GB'

    publishableKey: 'pk_live_51IG42bHYI4OuD4BxQSaWdlTqz6qNleqma5HynC85jvR2JHvzGuraxqancyymoNZw3X6WfHeU1cEulaSTAzNcccMv00XReFWmIN', locale: 'en-GB'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  fontawesome: {
    icons: {
      solid: ['faSearch', 'faShoppingCart', 'faEye', 'faEyeSlash', 'faUser'],
      brands: ['faTwitter']
    }
  },

  styleResources: {
    scss: ['./assets/scss/*.scss']
  },
}
