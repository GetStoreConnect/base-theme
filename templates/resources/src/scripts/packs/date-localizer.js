import { onDomChange } from '../theme/utils/init';

onDomChange(init);

function init(node) {
  [...node.querySelectorAll('time[data-timestamp]')].forEach(elem => localize(elem));
}

function localize(elem) {
  const styles = ["full", "long", "medium", "short"]
  const timestamp = elem.getAttribute('data-timestamp')

  let format = {}

  let dateStyle = elem.getAttribute('data-date-style')
  if (styles.includes(dateStyle)) format["dateStyle"] = dateStyle;

  let timeStyle = elem.getAttribute('data-time-style')
  if (styles.includes(timeStyle)) format["timeStyle"] = timeStyle;

  const formatter = new Intl.DateTimeFormat(Intl.DateTimeFormat().resolvedOptions().locale, format);
  outputString = formatter.format(Date.parse(timestamp));

  elem.innerHTML = outputString

  elem.setAttribute('title', Intl.DateTimeFormat().resolvedOptions().timeZone);
}
