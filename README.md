# sheet-loads-nuxt

> boilerplate for loading gsheets into your vue app

This boilerplate allows you to :

- agnostically load list of Google Sheet data to the store
- (option) add list of sheets as correspondance tables
- (option) add list of sheets as data types references
- by default the sheet-loads includes : internationalizatin with i18n, cookie-parser...


## Environment variables

You can define the locations of the gsheets you want to load in the environment variables (`.env` file). A file called `example.env` can be used as a template.

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
