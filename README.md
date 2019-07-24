# sheet-loads

aka : "givasheet"

> boilerplate for loading gsheets into your vue app... Then 

This boilerplate allows you to :

- agnostically load list of Google Sheet data to the store
- (option) add list of sheets as correspondance tables
- (option) add list of sheets as data types references
- by default the sheet-loads includes : internationalizatin with i18n, cookie-parser...

------

## Environment variables

You can define the locations of the gsheets you want to load in the environment variables (`.env` file). A file called `example.env` can be used as a template.

### Env vars as lists

In the `.env`file some variables will be converted into arrays or/and objects at launch in the `nuxt.config` file. 
Usually the logic is the followinng: 

```bash
### .env file
NUXT_ENV_LOCALES=Français:fr:fr-FR,English:en:en-US

# will be converted in the nuxt.config file into : 
myJsObject = [
  { myVar1: 'Français', myVar2: 'fr', myVar3: 'fr-FR' },
  { myVar1: 'English', myVar2: 'en', myVar3: 'en-US' },
]
```

### Configure GSheets loading

With **sheet-loads** you can load data several GSheets for several uses : as pure data, as 

Here an example based on this spreadsheet : 
https://docs.google.com/spreadsheets/d/1FcV5ZQAKyx5cZWW7EABTioaRYrs4Jw9ncHjs2ZeVWFA/edit#gid=0

```bash
### DATA GSHEETS : main datasets
# LIST FORMAT (separator == ',') : 
# NUXT_GSHEET_IDS_DATAS=<GSHEET_ID>:<SHEET_NUMBER>:<DS_ID>,....
NUXT_GSHEET_IDS_DATAS=1FcV5ZQAKyx5cZWW7EABTioaRYrs4Jw9ncHjs2ZeVWFA:1:contents

### DATA GSHEETS CORRESPONDANCE TABLES
# LIST FORMAT (separator == ',') : 
# NUXT_GSHEET_IDS_CORRESP_DICTS=<GSHEET_ID>:<SHEET_NUMBER>:<DS_ID>:COL_TITLE_FOR_KEY,....
NUXT_GSHEET_IDS_CORRESP_DICTS=1FcV5ZQAKyx5cZWW7EABTioaRYrs4Jw9ncHjs2ZeVWFA:2:correspondances:categories-code

### DATA GSHEETS TYPES
# LIST FORMAT (separator == ',') : 
# NUXT_GSHEET_IDS_DATA_TYPES=<GSHEET_ID>:<SHEET_NUMBER>:<DS_ID>::<COL_TITLE_FOR_KEY>:<DATATYPE>,....
NUXT_GSHEET_IDS_DATA_TYPES=1FcV5ZQAKyx5cZWW7EABTioaRYrs4Jw9ncHjs2ZeVWFA:3:my-types:col-title:data-type:is-list:list-separator:lang:key-value-separator
```

**Note** : you can specify several spreadsheets for every env variable, just separate each definition by a comma (`,`)

----------

## Stack 

- Nuxt
- Vuetify
- I18n
- Axios
- Material design icons
- Fontawesome icons
- Cookie-parser

----------

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
