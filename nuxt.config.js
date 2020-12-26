const env = require('dotenv').config()

export default {
  mode: 'spa',
  env: env.parsed,
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Sintony&family=Source+Sans+Pro:wght@900&display=swap' }
    ],
    script: [
      { src: 'https://js.api.here.com/v3/3.1/mapsjs-core.js' },
      { src: 'https://js.api.here.com/v3/3.1/mapsjs-service.js' },
      { src: 'https://js.api.here.com/v3/3.1/mapsjs-ui.js' },
      { src: 'https://js.api.here.com/v3/3.1/mapsjs-mapevents.js' },
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/tailwind.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // '@nuxtjs/eslint-module'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: {
        tailwindcss: './tailwind.config.js'
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.modules.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
