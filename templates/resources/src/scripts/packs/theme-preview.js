document.addEventListener('DOMContentLoaded', init)

function init() {
  const trigger = document.querySelector('[data-theme-preview-recents]');
  if (trigger) {
    trigger.addEventListener('change', activateTheme);
  }
}

function activateTheme(e) {
  const target = e.currentTarget

  if (target.value) {
    const params = new URLSearchParams(window.location.search)
    params.delete("theme-preview")
    params.append("theme-preview", target.value)
    window.location.search = params;
  }
}
