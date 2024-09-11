import Pikaday from 'pikaday'
import { onDomChange } from '../theme/utils/init';

onDomChange(init);

function init(node) {
  [...node.querySelectorAll('[data-date-picker]')].forEach(elem => new Pikaday({ field: elem }))
}
