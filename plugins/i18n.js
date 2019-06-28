import Vue from 'vue'
import VueI18n from 'vue-i18n'

console.log('>>> plugins / i18n.js ...');

Vue.use(VueI18n)

export default ({ app, store }) => {

  console.log('>>> plugins / i18n.js / store.state.locale : ', store.state.locale);

  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({

    // set initial locale
    locale: process.env.CONFIG_APP.defaultLocale,

    // set fallback locale
    fallbackLocale: process.env.CONFIG_APP.defaultLocale,

    messages: {
      'fr': require('~/locales/fr-FR.json'),
      'en': require('~/locales/en-US.json'),
    }

  })


  app.i18n.path = (link) => {

    console.log('>>> plugins / i18n.js / app.i18n.path / app.i18n.locale : ', app.i18n.locale);

    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`

  }
}