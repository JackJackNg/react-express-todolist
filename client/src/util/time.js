const moment = require('moment')
const UtcOffset = new Date().getTimezoneOffset()

function convertLocalToUtc (localDateTime) {
  return moment(localDateTime).utc()
}

function convertUtcToLocal (utc) {
  return moment(utc).utcOffset(-UtcOffset)
}

export  {
   convertLocalToUtc,
   convertUtcToLocal
}