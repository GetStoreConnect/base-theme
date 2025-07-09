import { onDomChange } from '../theme/utils/init'

onDomChange(init)

function init(node) {
  ;[...node.querySelectorAll('[data-search-nav-source]')].forEach((linkElement) => {
    setupNavLink(linkElement)
  })
}

function setupNavLink(linkElement) {
  const source = linkElement.dataset.searchNavSource
  const linkHref = linkElement.getAttribute('href')
  // add/replace ?source=... in the link href using URL lib
  const url = new URL(linkHref, window.location.origin)
  url.searchParams.set('source', source)
  linkElement.setAttribute('href', url.href)
}
