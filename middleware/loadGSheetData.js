import loadGoogleSheet from "~/utils/loadGSheetData"

export default function ({ isHMR, app, store, route, params, error, redirect }) {
  
  console.log('\n-MW-loadGSheetData ...')

  let isDataLoaded = false
  let isCorrespDictsLoaded = false

  let promisesArray = []

  // check if store.data ... datasets |  correspondanceDicts | dataTypes ... are empty
  let gSheetConfigsData      = store.getters['data/getGSheetConfigs']('gSheetConfigsData')
  let gSheetConfigsCorrDicts = store.getters['data/getGSheetConfigs']('gSheetConfigsDicts')
  let gSheetConfigsDataTypes = store.getters['data/getGSheetConfigs']('gSheetConfigsDataTypes')
  
  let storeDatasets    = store.getters['data/getDatasets']('datasets')
  let storeCorrespDict = store.getters['data/getDatasets']('correspondanceDicts')
  let storeDataTypes   = store.getters['data/getDatasets']('dataTypes')
  
  // console.losreDataTypes : ',   storeDataTypes)

  let isDatasets = ( storeDatasets.length === 0 )? false : true 
  let isCorrespDicts = ( storeCorrespDict.length === 0 )? false : true 
  let isDataTypes = ( storeDataTypes.length === 0 )? false : true 


  // push loadGoogleSheet promise in promlisesArray array

  // LOAD DATASETS
  if ( gSheetConfigsData && !isDatasets ){
    console.log('MW-loadGSheetData / needs GSheetLoading / datasets ...')
    for (let gsConfig of gSheetConfigsData) {
      let gsData = loadGoogleSheet( gsConfig )
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
      let gsData = loadGoogleSheet( gsConfig )
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

  // LOAD DATATYPES DICTS
  if ( gSheetConfigsDataTypes && !isDataTypes ){
    console.log('MW-loadGSheetData / needs GSheetLoading / dataTypes ...')
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
      // TO DO => MOVE THIS INTO SECOND MIDDLEWARE
      // .then( resp => {
      //   console.log(".then(2) => apply dataTypes ...")
      //   store.dispatch('data/applyDataTypesToDatasets')
      // })
      promisesArray.push( gsData )
    }
  } else {
    isCorrespDictsLoaded = true
  }


  // load promises 
  if ( !isDataLoaded || !isCorrespDictsLoaded ) {
    return Promise.all(promisesArray)
  } else {
    return isDataLoaded && isCorrespDictsLoaded
  }


}
