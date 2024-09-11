function Loader(settings) {
  const target = settings.target || null;
  const contextual = settings.contextual;

  return {
    on: () => stopLoader(target),
    off: () => startLoader(target, contextual)
  }
}

export function startLoader(container, contextual = false) {
  const loader = getLoader(container);

  if (loader) {
    activate(loader, contextual)
  } else {
    createLoader(container, contextual);
  }
}

export function stopLoader(container) {
  const loader = getLoader(container);

  if (loader === null) return;
  loader.classList.remove('is-active');
}

function getLoader(target) {
  const origin = target || document.querySelector('body');
  return origin.querySelector('[data-loader]');
}

function activate(loader, contextual = false) {
  if (loader.classList.contains('Loader')) {
    loader.classList.add('is-active');
  } else if (contextual) {
    loader.classList.add('Loader','is-active', 'is-contextual');
  } else {
    loader.classList.add('Loader','is-active');
  }
}

function createLoader(target, contextual = false) {
  const loader = document.createElement('div');
  const spinner = createSpinner();
  const destination = target || document.querySelector('body');

  loader.setAttribute('data-loader', '');
  loader.classList.add('Loader','is-active');
  if (contextual) loader.classList.add('is-contextual');
  destination.prepend(loader);
  loader.append(spinner);
}

function createSpinner() {
  const url = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(url, 'svg');
  const circle = document.createElementNS(url, 'circle');

  svg.setAttribute('viewBox', '0 0 50 50');
  svg.classList.add('spinner');
  circle.setAttribute('cx', '25');
  circle.setAttribute('cy', '25');
  circle.setAttribute('r','20');
  circle.setAttribute('fill', 'none');
  circle.setAttribute('stroke-width', '5');
  circle.classList.add('path');
  svg.appendChild(circle);

  return svg;
}

export default Loader