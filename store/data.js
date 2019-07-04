// store for data


export const state = () => ({

  log : process.env.LOG,

  // GOOGLE SHEET CONFIGS
  gSheetConfigsData: process.env.CONFIG_APP.gsheetConfigs_data,
  gSheetConfigsDicts: process.env.CONFIG_APP.gsheetConfigs_correspDicts,
  gSheetConfigsDataTypes: process.env.CONFIG_APP.gsheetConfigs_dataTypes,

  // GOOGLE SHEETS DATA
  datasets : [],
  correspondanceDicts : [],
  dataTypes : []

  // OPTIONAL : QUERIES AND RESPONSES
  // query: undefined,

})

export const getters = {

  // GSHEET CONFIGS
  getGSheetConfigs : state => gSheetConfigName =>  {
    console.log("S-index-G-getGSheetConfigs / gSheetConfigName : ", gSheetConfigName)
    return state[ gSheetConfigName ]
  },

  // GSHEET DATA
  getDatasets: state => datasetName => {
    console.log("S-index-G-getDatasets / datasetName : ", datasetName)
    return state[ datasetName ]
  },

}

export const mutations = {

  setDatasets(state, datasetInfos) {
    console.log("S-index-M-setDatasets / datasets ")
    state[ datasetInfos.datasetStoreKey ].push( datasetInfos.data )
  },


}

export const actions = {

  applyDataTypesToDatasets({state, commit, getters}){

    console.log("S-index-A-applyDataTypesToDatasets ... ")
    
    // get dataTypes 
    let currentDataTypes = getters['getDatasets']('dataTypes')
    console.log("S-index-A-applyDataTypesToDatasets / currentDataTypes : ", currentDataTypes)

  }

}