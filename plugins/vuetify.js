import Vue from 'vue'
import Vuetify from 'vuetify'

import colors from 'vuetify/es5/util/colors'

console.log('>>> plugins / vuetify.js ...');

Vue.use( Vuetify, {

  // iconfont: 'mdi', // 'md' || 'mdi' || 'fa' || 'fa4'

  theme: {

    // primary: '#20B7B7', // "#209A82", jpy green
    // secondary: '#90e4e4', // "#22C9C9", "#29c7a7", jpy light green
    // accent: '#cf6c37',
    // error: '#FF5252',
    // warning: '#FFC107',
    // info: '#26A69A',
    // success: '#00BCD4'

    primary: process.env.CONFIG_APP.UI_config.colors.primary,
    secondary: process.env.CONFIG_APP.UI_config.colors.secondary,
    accent: process.env.CONFIG_APP.UI_config.colors.accent,
    error: process.env.CONFIG_APP.UI_config.colors.error,
    warning: process.env.CONFIG_APP.UI_config.colors.warning,
    info: process.env.CONFIG_APP.UI_config.colors.info,
    success: process.env.CONFIG_APP.UI_config.colors.success

    // DEFAULT
    // primary	: '#1976D2',
    // info		: '#2196F3',
    // secondary: '#424242',
    // accent	: '#82B1FF',
    // error	: '#FF5252',
    // success	: '#4CAF50',
    // warning	: '#FFC107'
  }
})
