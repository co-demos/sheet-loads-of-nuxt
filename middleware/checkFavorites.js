var cookieparser = require('cookieparser')

export default function ({ req, store, app, redirect }) {

  console.log('\n-MW-Middleware : checkFavorites...')
  let parsed = undefined 

  if (process.server) {
    console.log('-MW-checkFavorites : process.server == TRUE ')
    if (req.headers.cookie) {
      let cookie = req.headers.cookie
      parsed = cookieparser.parse(cookie)
    }
  }

  else {
    console.log('-MW-checkFavorites : process.server == FALSE ')
    let cookie = document.cookie
    parsed = cookieparser.parse(cookie)
  }

  // console.log('-MW-checkFavorites / parsed :', parsed)


}