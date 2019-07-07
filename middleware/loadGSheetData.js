import loadGoogleSheet from "~/utils/loadGSheetData"

export default function ({ isHMR, app, store, route, params, error, redirect }) {
  
  console.log('\n-MW-loadGSheetData ...')

  let isDataLoaded = false
  let isCorrespDictsLoaded = false

  let promisesArray = []

  // check if store.data ... datasets |  correspondanceDicts | dataTypes ... are empty
  let gSheetConfigsData      = store.getters['data/getGSheetConfigs']('gSheetConfigsData')
  let gSheetConfigsCorrDicts = store.getters['data/getGSheetConfigs']('gSheetConfigsDicts')
  
  let storeDatasets    = store.getters['data/getDatasets']('datasets')
  let storeCorrespDict = store.getters['data/getDatasets']('correspondanceDicts')

  // let storeDataTypes = store.getters['data/getDatasets']('dataTypes')
  let storeDataTypes = store.getters['data/getConcatenatedDataTypes']
  console.log('MW-loadGSheetData / storeDataTypes :', storeDataTypes)

  let isDatasets = ( storeDatasets.length === 0 )? false : true 
  let isCorrespDicts = ( storeCorrespDict.length === 0 )? false : true 
  // let isDataTypes = ( storeDataTypes.length === 0 )? false : true 


  // push loadGoogleSheet promise in promlisesArray array

  // LOAD DATASETS
  if ( gSheetConfigsData && !isDatasets ){
    console.log('MW-loadGSheetData / needs GSheetLoading / datasets ...')
    for (let gsConfig of gSheetConfigsData) {
      let gsData = loadGoogleSheet( gsConfig, storeDataTypes )
      gsData.then( resp => {
        console.log(".then() => datasets ...")
        console.log(".then() => resp : ", resp)
        let datasetInfos = {
          data : resp,
          datasetStoreKey : 'datasets'
        }
        store.commit('data/setDatasets', datasetInfos)
        console.log("...")
      })
      promisesArray.push( gsData )
    }
  } else {
    isDataLoaded = true
  }

  console.log("")

  // LOAD CORRESP DICTS
  if ( gSheetConfigsCorrDicts && !isCorrespDicts ){
    console.log('MW-loadGSheetData / needs GSheetLoading / correspDicts ...')
    for (let gsConfig of gSheetConfigsCorrDicts) {
      let gsData = loadGoogleSheet( gsConfig, storeDataTypes )
      gsData.then( resp => {
        console.log(".then() => correspondanceDicts ...")
        console.log(".then() => resp : ", resp)
        let datasetInfos = {
          data : resp,
          datasetStoreKey : 'correspondanceDicts'
        }
        store.commit('data/setDatasets', datasetInfos)
        console.log("...")
      })
      promisesArray.push( gsData )
    }
  } else {
    isCorrespDictsLoaded = true
  }

  console.log("")


  // load promises 
  if ( !isDataLoaded || !isCorrespDictsLoaded ) {
    return Promise.all(promisesArray)
  } else {
    return isDataLoaded && isCorrespDictsLoaded
  }


}
