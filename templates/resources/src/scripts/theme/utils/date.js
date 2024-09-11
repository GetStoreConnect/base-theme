export function formatDate(d) {
  const date = new Date(d);
  var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .split("T")[0];
  return dateString;
}
