console.log('>>> utils/loadGSheetData... ')

import axios from 'axios'
// import * as _ from 'lodash'


// REMAPPER
export function remapGSheetData ( GSdataEntryList, GSheetConfig, dsTypes ) {
  
  const gsPrefix = "gsx$"
  const gsValKey = "$t"

  console.log('\n>>> UT-remapGSheetData / GSdataEntryList :', GSdataEntryList)
  console.log('>>> UT-remapGSheetData / GSheetConfig :', GSheetConfig)
  console.log('>>> UT-remapGSheetData / dsTypes :', dsTypes)

  let isDsDataType = GSheetConfig.datasetType === 'dataTypes'
  console.log('>>> UT-remapGSheetData / isDsDataType :', isDsDataType)

  let colTitleKey = ( isDsDataType )? GSheetConfig.colTitleKey : undefined
  let colTitleDatatype = ( isDsDataType )? GSheetConfig.colTitleDatatype : undefined
  let colTitleIsList = ( isDsDataType )? GSheetConfig.colTitleIsList : undefined
  let colTitleListSeparator = ( isDsDataType )? GSheetConfig.colTitleListSeparator : undefined
  let colTitleLang = ( isDsDataType )? GSheetConfig.colTitleLang : undefined
  let colTitleKeyValSep = ( isDsDataType )? GSheetConfig.colTitleKeyValSep : undefined

  // console.log(`>>> UT-remapGSheetData / colTitleKey : ${colTitleKey} / colTitleDatatype : ${colTitleDatatype} / colTitleIsList : ${colTitleIsList}`)

  let remappedGSdata = GSdataEntryList.map( entryObject => {
    // console.log('>>> UT-remapGSheetData / entryObject :', entryObject)
    let container = {}
    for ( let entryKey in entryObject ){
      if (entryKey.startsWith(gsPrefix) ){

        let rawValue = entryObject[entryKey][gsValKey]
        let rawKey = entryKey.replace(gsPrefix,"")
        let value = undefined

        // create special remapping only for datatypes set
        if ( isDsDataType ){

          // console.log(`\n>>> UT-remapGSheetData / rawValue : ${rawKey}`) // / rawValue : ${rawValue} / colTitleIsList : ${colTitleIsList}`)
          value = (rawValue !== '')? rawValue : undefined

          if ( rawKey === colTitleKey ){ rawKey = 'colKey' } 
          else if ( rawKey === colTitleDatatype ) { rawKey = 'colDatatype' } 
          else if ( rawKey === colTitleIsList ) { 
            // console.log('>>> UT-remapGSheetData / is colTitleIsList ...')
            rawKey = 'colIsList' ;
            value = (rawValue !== '')? true : false
            // console.log('>>> UT-remapGSheetData / is colTitleIsList / rawValue : ', rawValue)
          }
          else if ( rawKey === colTitleListSeparator ) { rawKey = 'colListSeparator' }
          else if ( rawKey === colTitleLang ) { rawKey = 'colLang' }
          else if ( rawKey === colTitleKeyValSep ) { rawKey = 'colKeyValObj' }
        } 
        else {
          let valueObject = { key: rawKey, val: rawValue }
          value = applyDataTypes( valueObject, dsTypes)
        }
        container[ rawKey ] = value
      }
    }
    // console.log('>>> UT-remapGSheetData / container :', container)
    // console.log("...")
    return container
  })
  // console.log('>>> UT-remapGSheetData / remappedGSdata :', remappedGSdata)
  return remappedGSdata
} 


// HEADERS TABLE
export function createDatasetHeaders ( GSdataFirstRow, dataTypes ){

  console.log('>>> UT-createDatasetHeaders / GSdataFirstRow :', GSdataFirstRow)
  console.log('>>> UT-createDatasetHeaders / dataTypes :', dataTypes)

  let headers = []
  for ( let entryKey in GSdataFirstRow ){
    let container = {
      text: entryKey,
      align: 'left',
      sortable: true, 
      value: entryKey
    }
    let colType = dataTypes && dataTypes.find( dt => {
      return dt.colKey === entryKey
    })
    if ( colType ){
      container['lang'] = colType.colLang
      container['datatype'] = colType.datatype
      container['isList'] = colType.datatype
    } else {
      container['datatype'] = 'string'
    }
    headers.push(container)
  }
  return headers
} 




// APPLY DATATYPES TO A DATASET
export function applyDataTypes ( valueObject, dsTypes ){

  console.log(">>> UT-applyDataTypes ... ")
  // console.log(">>> UT-applyDataTypes / valueObject : ", valueObject)
  // console.log(">>> UT-applyDataTypes / dsTypes : ", dsTypes)
  let value = valueObject.val

  if ( dsTypes ){
    let dsType = dsTypes.find( dst => {
      return dst.colKey === valueObject.key
    })
    if ( dsType ){
      // console.log(">>> UT-applyDataTypes / dsType : ", dsType)

      // split list
      let isList = dsType.colIsList 
      let listSeparator = ( dsType.colIsList )? dsType.colListSeparator : undefined
      if ( isList ){
        value = value.split( listSeparator ).map( v => { return v.trim() })
        // value = value.map( v => { return v.trim() })
      }

      // parse int | float | json | object
      // ints
      if ( dsType.colDatatype === 'int' ) {
        value = (isList)? value.map(Number) : parseInt(value)
      }
      // floats
      else if ( dsType.colDatatype === 'float' ) {
        value = (isList)? value.map(parseFloat) : parseFloat(value)
      }
      // object
      else if ( dsType.colDatatype === 'object' ) {
        let colKeyValObj = dsType.colKeyValObj 
        // console.log(">>> UT-applyDataTypes / colKeyValObj : ", colKeyValObj)
        // console.log(">>> UT-applyDataTypes / value : ", value)
        // console.log(">>> UT-applyDataTypes / isList : ", isList)
        if (isList) {
          let newValue = []
          for ( let valObj of value ) {
            // console.log(">>> UT-applyDataTypes / valObj : ", valObj)
            let container = {}
            let splitted = valObj.split(colKeyValObj)
            container[ splitted[0] ] = splitted[1]
            newValue.push( container )
          }
          value = newValue
        } else {
          let container = {}
          let splitted = valObj.split(colKeyValObj)
          container[ splitted[0] ] = splitted[1]
          value = container
        }
        // console.log(">>> UT-applyDataTypes / value : ", value)
      }
      // json
      else if ( dsType.colDatatype === 'json' ) { 
        // console.log(">>> UT-applyDataTypes / json - value : ", value)
        try {
          newValue = JSON.parse(JSON.parse(value))
          console.log(">>> UT-applyDataTypes / json - newValue : ", newValue)
          value = newValue
        } catch {
          console.log(">>> UT-applyDataTypes / error parsing json - value : ", value)
        }
      }

    }
  }

  return value

} 


// main function to load data frrom GSheet and loading it into the store
export default async function loadGoogleSheet( GSheetConfig, dataTypes=undefined ){

  try {

    console.log('>>> UT-loadGSheet / GSheetConfig :', GSheetConfig)
  
    // build url from gsheet config object
    let GSbaseUrl = `https://spreadsheets.google.com/feeds/list/${GSheetConfig.gsId}/${GSheetConfig.sheetNumber}/public/values?alt=json`
    console.log('>>> UT-loadGSheet / GSbaseUrl :', GSbaseUrl)

    // call Axios
    let data = await axios.get( GSbaseUrl)
    .then(response => {

      console.log('>>> UT-loadGSheet / response :', response)
      let GSdata = {
        nameSheet: response.data.feed.title.$t,
        gsId : GSheetConfig.gsId,
        gsSheetN : GSheetConfig.sheetNumber,
        dsType: GSheetConfig.datasetType,
        dataRows: remapGSheetData( response.data.feed.entry, GSheetConfig, dataTypes ),
      }
      GSdata['dataHeaders'] = createDatasetHeaders( GSdata.dataRows[0], dataTypes )
      if ( GSheetConfig.datasetType == 'dataTypes') {
        GSdata['colTitleKey'] = GSheetConfig.colTitleKey
        GSdata['colTitleDatatype'] = GSheetConfig.colTitleDatatype
      }
      console.log('>>> UT-loadGSheet / GSdata :', GSdata)

      return GSdata

    })
    
    console.log('>>> UT-loadGSheet / data :', data)
    return data

  } catch (error) {
    alert(error)
  }

}

// // prototype you can directly use in components 
// Vue.prototype.$LoadGsheet = ( GSheetConfig ) => {

//   console.log('\n>>> UT-LoadGSheetData / GSheetConfig :', GSheetConfig)

//   let gSheetData = {}

//   let rawData = loadGSheet( GSheetConfig )
//   console.log('>>> UT-LoadGSheetData / rawData :', rawData)



//   return gSheetData

// }





