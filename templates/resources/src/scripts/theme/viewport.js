const BREAKPOINTS = [
  {id: 0, name: 'base'},
  {id: 1, name: 'small'},
  {id: 2, name: 'medium'},
  {id: 3, name: 'large'},
  {id: 4, name: 'xlarge'},
  {id: 5, name: 'huge'}
]

export const smallAndUp = () => returnBreakpoint() >= 1

export const mediumAndUp = () => returnBreakpoint() > 1

export const largeAndUp = () => returnBreakpoint() > 2

export const xlargeAndUp = () => returnBreakpoint() > 3

export const hugeAndUp = () => returnBreakpoint() > 4


function returnBreakpoint() {
  let breakpoint

  if (document.querySelector('[data-breakpoint]') === null) {
    createBreakpointElements()
  }

  for (var i = 0; i < BREAKPOINTS.length; i++) {
    const elem = document.querySelector(`[data-breakpoint="${ BREAKPOINTS[i].id }"]`)

    if (elem && isVisible(elem)) {
      breakpoint = BREAKPOINTS[i]
      break
    }
  }

  return breakpoint.id
}

function createBreakpointElements() {
  BREAKPOINTS.map(breakpoint => {
    const elem = document.createElement("div")

    elem.setAttribute('data-breakpoint', breakpoint.id)
    document.querySelector('body').append(elem)
  });
}

function isVisible(element) {
  return window.getComputedStyle(element).display !== 'none'
}
