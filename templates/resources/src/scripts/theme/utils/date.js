// Time constants
export const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000
export const DAYS_PER_WEEK = 7

export function formatDate(d) {
  const date = new Date(d)
  var dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0]
  return dateString
}

export function addDays(date, days) {
  const timestamp = typeof date === 'number' ? date : Date.parse(date)
  return timestamp + days * MILLISECONDS_PER_DAY
}

export function subtractDays(date, days) {
  const timestamp = typeof date === 'number' ? date : Date.parse(date)
  return timestamp - days * MILLISECONDS_PER_DAY
}
