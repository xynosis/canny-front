

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'The West End Children\'s Community',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [

      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
      },
      {
        rel: 'stylesheet',
        href:
          'https://use.typekit.net/gqb3weu.css',
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
    publishableKey: 'pk_test_51IG42bHYI4OuD4BxkIfFlFcNYmNA1NMQ4bUYAu0uWFRQbXdIpaI6nS1pRpmCXFYRJMA1G2qHEAjPtRgWWjkaIqp000QwFBOGKk', locale: 'en-GB'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  fontawesome: {
    icons: {
      solid: ['faSearch', 'faShoppingCart'],
      brands: ['faTwitter']
    }
  },

  styleResources: {
    scss: ['./assets/scss/*.scss']
  },
}