import { onDomChange } from '../theme/utils/init';

onDomChange(init);

function init(node) {
  [...node.querySelectorAll('[data-pts-toggle] input')].forEach(toggle => {
    toggle.addEventListener('change', () => changeToggle(toggle));
  });
}

function changeToggle(toggle) {
  toggle.form.requestSubmit();
}
