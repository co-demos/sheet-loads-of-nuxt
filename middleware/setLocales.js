export default function ({ req, store, app, redirect }) {

  let hasLocales = store.state.locales 

  if (!hasLocales){
    console.log('\n-MW- setLocales...')

    let localesObj = process.env.CONFIG_APP.localesBuild
    console.log('-MW- setLocales / localesObj : ', localesObj)

    let defaultLocaleIso = process.env.CONFIG_APP.defaultLocale
    console.log('-MW- setLocales / defaultLocaleIso : ', defaultLocaleIso)

    store.commit('initLocales')
    
  }

}
