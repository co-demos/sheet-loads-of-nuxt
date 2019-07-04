console.log('>>> utils/loadGSheetData... ')

import axios from 'axios'
// import * as _ from 'lodash'


// REMAPPER
export function remapGSheetData ( GSdataEntryList ) {
  
  const gsPrefix = "gsx$"
  const gsValKey = "$t"

  console.log('>>> PL-remapGSheetData / GSdataEntryList :', GSdataEntryList)
  let remappedGSdata = GSdataEntryList.map( entryObject => {
    // console.log('>>> PL-remapGSheetData / entryObject :', entryObject)
    let container = {}
    for ( let entryKey in entryObject ){
      if (entryKey.startsWith(gsPrefix) ){
        container[ entryKey.replace(gsPrefix,"") ] = entryObject[entryKey][gsValKey]
      }
    }
    return container
  })
  return remappedGSdata
  // return GSdataEntryList
} 


// main function to load data frrom GSheet and loading it into the store
export default async function loadGoogleSheet( GSheetConfig ){

  try {

    console.log('>>> PL-loadGSheet / GSheetConfig :', GSheetConfig)
  
    // build url from gsheet config object
    let GSbaseUrl = `https://spreadsheets.google.com/feeds/list/${GSheetConfig.gsId}/${GSheetConfig.sheetNumber}/public/values?alt=json`
    console.log('>>> PL-loadGSheet / GSbaseUrl :', GSbaseUrl)

    // call Axios
    let data = await axios.get( GSbaseUrl)
    .then(response => {

      console.log('>>> PL-loadGSheet / response :', response)
      let GSdata = {
        nameSheet: response.data.feed.title.$t,
        gsId : GSheetConfig.gsId,
        gsSheetN : GSheetConfig.sheetNumber,
        dataRows: remapGSheetData( response.data.feed.entry ),
      }
      console.log('>>> PL-loadGSheet / GSdata :', GSdata)

      return GSdata

    })
    
    console.log('>>> PL-loadGSheet / data :', data)
    return data

  } catch (error) {
    alert(error)
  }

}

// // prototype you can directly use in components 
// Vue.prototype.$LoadGsheet = ( GSheetConfig ) => {

//   console.log('\n>>> PL-LoadGSheetData / GSheetConfig :', GSheetConfig)

//   let gSheetData = {}

//   let rawData = loadGSheet( GSheetConfig )
//   console.log('>>> PL-LoadGSheetData / rawData :', rawData)



//   return gSheetData

// }





