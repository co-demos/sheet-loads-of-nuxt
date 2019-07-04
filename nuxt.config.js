import colors from 'vuetify/es5/util/colors'

import pkg from './package'

require('dotenv').config()

console.log('>>> nuxt.config.js / process.env.NUXT_GSHEET_IDS : ', process.env.NUXT_GSHEET_IDS)

const trueStrings = ['yes', 'Yes', 'YES', 'y', 'Y', 'true', 'True', 'TRUE', 't', 'T']
const falseStrings = ['no', 'No', 'NO', 'n', 'N', 'false', 'False', 'FALSE', 'f', 'F']
const logAllowed = ['preprod', 'dev']


// SELECTOR FUNCTIONS FROM ENV VAR
const chooseBooleanMode = (ARG) => {
  if (trueStrings.includes(ARG)) {
    return true
  } else {
    return false
  }
}
const choosePort = (ENVPROD) => {
  const NUXT_ENV_PORT_DEV = parseInt(process.env.NUXT_ENV_PORT_DEV) || 50050
  const NUXT_ENV_PORT_PREPROD = parseInt(process.env.NUXT_ENV_PORT_PREPROD) || 50051
  const NUXT_ENV_PORT_PROD = parseInt(process.env.NUXT_ENV_PORT_PROD) || 50052
  if (ENVPROD === 'dev') {
    return NUXT_ENV_PORT_DEV
  } else if (ENVPROD === 'preprod') {
    return NUXT_ENV_PORT_PREPROD
  } else if (ENVPROD === 'prod') {
    return NUXT_ENV_PORT_PROD
  }
}

const buildGSheets = (envDict, dsType) => {
  if (envDict) {
    let gSheets = [] 
    for ( const gsheet of envDict.split(',') ) {
      let gsheetConfig = gsheet.split(':')
      let gsheetObj = {
        gsId: gsheetConfig[0],
        sheetNumber: gsheetConfig[1],
        // name: gsheetConfig[2],
        datasetType: dsType,
      }
      if ( dsType == 'dataTypes' ){
        gsheetObj['colTitleKey'] = gsheetConfig[2]
        gsheetObj['colTitleDatatype'] = gsheetConfig[3]
        gsheetObj['colTitleIsList'] = gsheetConfig[4]
        gsheetObj['colTitleListSeparator'] = gsheetConfig[5]
        gsheetObj['colTitleLang'] = gsheetConfig[6]
        gsheetObj['colTitleKeyValSep'] = gsheetConfig[7]
      } 
      gSheets.push(gsheetObj)
    }
    return gSheets
  } else {
    // if no envDict return undefined
    return undefined
  }
}

const buildLocales = () => {
  let locales = [] 
  for ( const locale of process.env.NUXT_ENV_LOCALES.split(',') ) {
    let localeData = locale.split(':')
    let localeObj = {
      name: localeData[0],
      code: localeData[1],
      iso: localeData[2],
      file: localeData[2] + '.json'
    }
    locales.push(localeObj)
  }
  return locales
}

const configApp = {

  /// APP INFOS
  appTitle: process.env.NUXT_ENV_APP_TITLE,

  // DEV MODE - PORT - HOST ...
  mode: process.env.NUXT_ENV_RUN_MODE,
  host: process.env.NUXT_ENV_HOST,
  port: choosePort(process.env.NUXT_ENV_RUN_MODE),

  // INTERNATIONALIZATION
  defaultLocale: process.env.NUXT_ENV_LOCALE_DEFAULT,
  localesBuild: buildLocales(),
  // locales: buildLocales().map(loc => {return loc.code}) ,

  // DATA : only 3 types : "data" | "dict" | "types"
  gsheetConfigs_data: buildGSheets(process.env.NUXT_GSHEET_IDS_DATAS, "datasets"),
  gsheetConfigs_correspDicts: buildGSheets(process.env.NUXT_GSHEET_IDS_CORRESP_DICTS, "correspondanceDicts") ,
  gsheetConfigs_dataTypes: buildGSheets(process.env.NUXT_GSHEET_IDS_DATA_TYPES, "dataTypes") ,

  // UI
  UI_config : {
    colors : {
      primary: process.env.VUETIFY_primary,
      accent: process.env.VUETIFY_accent,
      secondary: process.env.VUETIFY_secondary,
      info: process.env.VUETIFY_info,
      warning: process.env.VUETIFY_warning,
      error: process.env.VUETIFY_error,
      success: process.env.VUETIFY_success
    },
    typos : {

    }
  }

}
console.log('>>> nuxt.config.js / configApp : \n', configApp)

// NUXT CONFIG
export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      // { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css' },
    ]
  },

  // for build or dev
  // https://nuxtjs.org/faq/host-port/
  server: {
    port: configApp.port, // 50050
    host: configApp.host // XXX.XX.XX.XX
  },

  // custom env variables for nuxt
  // cf : https://github.com/nuxt/nuxt.js/issues/1789
  env: {
    MODE_APP: configApp.mode,
    LOG: logAllowed.includes(configApp.mode),
    CONFIG_APP: configApp
  },

  /*
  ** Routes and middlewares to load before loading routes
  */
  router : {
    middleware: [
      'setLocales',
      'i18n',
      'loadGSheetDataTypes',
      'loadGSheetData',
      // 'applyDataTypes',
      'checkFavorites',
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { 
    color: '#fff' 
  },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl',
    // '~/assets/style/variables.styl',
    // { src : '~/assets/css/main.scss', lang: 'scss' },
    '~/assets/css/main.scss',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '~/plugins/vuetify.js',
    '~/plugins/i18n.js',
    // '~/plugins/loadGSheetData',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [

    '@nuxtjs/vuetify',

    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',

  ],

  devModules: [
    '@nuxtjs/vuetify'
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },

  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    theme: {
        primary: configApp.UI_config.colors.primary,
        secondary: configApp.UI_config.colors.secondary,
        accent: configApp.UI_config.colors.accent,
        error: configApp.UI_config.colors.error,
        warning: configApp.UI_config.colors.warning,
        info: configApp.UI_config.colors.info,
        success: configApp.UI_config.colors.success
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // vendor: ['vue-i18n'],
    extend(config, ctx) {
    }
  }
}
