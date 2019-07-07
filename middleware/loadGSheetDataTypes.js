import loadGoogleSheet from "~/utils/loadGSheetData"

export default function ({ isHMR, app, store, route, params, error, redirect }) {
  
  console.log('\n-MW-loadGSheetDataTypes ...')

  let isDataTypesLoaded = false
  let promisesArray = []

  // check if store.data ... datasets |  correspondanceDicts | dataTypes ... are empty
  let gSheetConfigsDataTypes = store.getters['data/getGSheetConfigs']('gSheetConfigsDataTypes')
  
  let storeDataTypes = store.getters['data/getDatasets']('dataTypes')
  let isDataTypes = ( storeDataTypes.length === 0 )? false : true 

  // LOAD DATATYPES DICTS
  if ( gSheetConfigsDataTypes && !isDataTypes ){
    console.log('MW-loadGSheetDataTypes / needs GSheetLoading / dataTypes ...')
    for (let gsConfig of gSheetConfigsDataTypes) {
      let gsData = loadGoogleSheet( gsConfig )
      gsData
      .then( resp => {
        console.log(".then(1) => dataTypes ...")
        console.log(".then(1) => resp : ", resp)
        let datasetInfos = {
          data : resp,
          datasetStoreKey : 'dataTypes'
        }
        store.commit('data/setDatasets', datasetInfos)
        console.log("...")
      })
      promisesArray.push( gsData )
    }
  } else {
    isDataTypesLoaded = true
  }


  // load promises 
  if ( !isDataTypesLoaded ) {
    return Promise.all(promisesArray)
  } else {
    return isDataTypesLoaded // equiv. to true
  }


}
