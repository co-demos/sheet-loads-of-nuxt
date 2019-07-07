export default function ({ isHMR, app, store, route, params, error, redirect }) {
  
  console.log('\n-MW-applyDataTypes ...')

  let isHeadersCreated = store.getters['data/getIsHeadersCreated']
  let isTypesApplied = store.getters['data/getIsTypesApplied']

  // // create headers if not done yet
  // if ( !isHeadersCreated ) {

  // }

  // apply dataTypes if not done yet
  if ( !isTypesApplied  ) {

    let storeDataTypes = store.getters['data/getDatasets']('dataTypes')
    console.log('MW-applyDataTypes / storeDataTypes :', storeDataTypes)
    
    if ( storeDataTypes.length > 0  ) {
    
      // apply dataTypes to every dataset
      store.dispatch('data/applyDataTypesToDatasets')

    } else {

      // flag as done 
      store.commit('data/setIsTypesApplied', true)

    }

  } 


}