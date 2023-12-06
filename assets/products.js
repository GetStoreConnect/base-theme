import { initCustomElements } from "/system/elements"

// Searches through nodes, finds custom elements and
// initalises them. Some performance testing needed.
// Alternately, we require users to manually define
// all custom elements used on a given page.
initCustomElements()

// Clients can add custom page JS here
// NOTE: This file should run through a build step
