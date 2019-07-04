// main store index

export const state = () => ({

  // GLOABAL APP ENV
  appTitle : process.env.appTitle,
  runMode : process.env.MODE_APP,
  log : process.env.LOG,

  // FOR TRANSLATIONS
  defaultLocale: undefined, 
  locale: undefined, 
  locales: undefined, 

  // UX OPTIONS
  showNav : false,

})

export const getters = {

  // INTERNATIONALIZATION
  getDefaultLocale : (state, getters) => {
    console.log("S-index-G-getDefaultLocale ...")
    return process.env.CONFIG_APP.defaultLocale
  },

  getCurrentLocale : (state, getters) => {
    console.log("S-index-G-getCurrentLocale / state.locale : ", state.locale)
    return state.locale ? state.locale : getters.getDefaultLocale
  },

  // UX GETTERS
  getNavbarVisibility : state => {
    return state.showNav
  },

}

export const mutations = {

  // INTERNATIONALIZATION
  initLocales(state) {
    console.log("S-index-M-initLocales ... ")

    let localesBuild = process.env.CONFIG_APP.localesBuild
    state.locales = localesBuild

    let defaultLocale = process.env.CONFIG_APP.defaultLocale
    state.locale = defaultLocale
    state.defaultLocale = defaultLocale

  },

  switchLocale(state, localeObject) {
    console.log("S-index-M-switchLocale / localeObject : ", localeObject)
    state.locale = localeObject.code
    // this.$i18n.locale = localeObject.code
  },




  // UX OPTIONS-RELATED
  switchNavbarMenu(state){
    state.showNav = !state.showNav
  },

  setShowNavbar(state, value){
    state.showNav = value
  },

}

export const actions = {

}