// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  plugins : [
    '~/plugins/ably.js',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME,
      apiBaseURL: process.env.API_BASE_URL,
      ablyApiKey: process.env.ABLY_API_KEY,
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
    },
  },

  ssr: true,
  
  app: {
    head: {
      title: 'LendCash Microfinance',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'LendCash Microfinance', name: 'Lending no collateral', content: 'My LendCash application' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/lending_logo.png' }
      ],
      style: [
        { children: ':root { --header-logo-width: 150px; }' }
      ]
    }
  },
})
