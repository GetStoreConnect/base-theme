import { onDomChange } from '../theme/utils/init';

onDomChange(init);

function init(node) {
  [...node.querySelectorAll('[data-accordion-trigger]')].forEach(trigger => {
    trigger.addEventListener('click', toggleActiveState);
  });
}

function toggleActiveState(e) {
  const parent = e.currentTarget.parentNode;
  const target = parent.querySelector('[data-accordion-target]');
  const icons = parent.querySelectorAll('[data-accordion-icon]');

  const isExpanded = target.getAttribute('aria-expanded') === 'true';
  target.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');

  icons.forEach(icon => icon.classList.toggle('is-active'));
  parent.classList.toggle('is-active');
  target.classList.toggle('is-expanded');
}
