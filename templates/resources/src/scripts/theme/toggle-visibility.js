document.addEventListener('DOMContentLoaded', function() {
  const triggers = document.querySelectorAll('[data-toggle-visibility]');

  [...triggers].map(trigger => trigger.addEventListener('click', toggle));
});

function toggle(event) {
  const id = event.currentTarget.getAttribute('data-toggle-visibility');
  const targets = document.querySelectorAll('[data-toggle-visibility-target=' + id + ']');

  [...targets].map(target => target.classList.toggle('is-hidden'));
  event.currentTarget.classList.toggle('target-hidden')
}
