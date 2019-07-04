// store for data

import { loadGoogleSheet, applyDataTypes, createDatasetHeaders } from "~/utils/loadGSheetData"

export const state = () => ({

  log : process.env.LOG,

  // GOOGLE SHEET CONFIGS
  gSheetConfigsData: process.env.CONFIG_APP.gsheetConfigs_data,
  gSheetConfigsDicts: process.env.CONFIG_APP.gsheetConfigs_correspDicts,
  gSheetConfigsDataTypes: process.env.CONFIG_APP.gsheetConfigs_dataTypes,

  // GOOGLE SHEETS DATA
  datasets : [],
  correspondanceDicts : [],
  dataTypes : [],

  // isTypesApplied : false, 


  // OPTIONAL : QUERIES AND RESPONSES
  // query: undefined,

})

export const getters = {

  // GSHEET CONFIGS
  getGSheetConfigs : state => gSheetConfigName =>  {
    console.log("S-data-G-getGSheetConfigs / gSheetConfigName : ", gSheetConfigName)
    return state[ gSheetConfigName ]
  },

  // GSHEET DATA
  getDatasets: state => datasetName => {
    console.log("S-data-G-getDatasets / datasetName : ", datasetName)
    return state[ datasetName ]
  },
  getConcatenatedDataTypes: state => {
    console.log("S-data-G-getConcatenatedDataTypes ... ")
    let concatenated = []
    for (let dt of state.dataTypes){
      console.log("S-data-G-getConcatenatedDataTypes / dt :", dt)
      let dtRows = dt.dataRows
      console.log("S-data-G-getConcatenatedDataTypes / dtRows :", dtRows)
      concatenated = concatenated.concat( ...dtRows )
    }
    return concatenated
  },
  getIsTypesApplied : state =>  {
    return state.isTypesApplied
  },

}

export const mutations = {

  // GSHEET DATA MUTATIONS
  setDatasets(state, datasetInfos) {
    console.log("S-data-M-setDatasets ...")
    state[ datasetInfos.datasetStoreKey ].push( datasetInfos.data )
  },
  setIsTypesApplied(state, status) {
    state.isTypesApplied = status
  },
  resetDatasets(state, datasetInfos) {
    console.log("S-data-M-setDatasets / datasets ")
    state[ datasetInfos.datasetStoreKey ] = []
  },

}

export const actions = {

  // GSHEET DATA OPERATIONS

  applyDataTypesToDatasets({state, commit, getters}){

    console.log("S-data-A-applyDataTypesToDatasets ... ")

    // get dataTypes 
    let currentDataTypes = getters['getDatasets']('dataTypes')
    console.log("S-data-A-applyDataTypesToDatasets / currentDataTypes : ", currentDataTypes)

    // TO DO 


    commit('setIsTypesApplied', true)

  },




  // reloadDatasets({state, commit, getters}){

  // },

}