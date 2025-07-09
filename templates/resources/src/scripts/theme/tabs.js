import { onDomChange } from './utils/init'

let sets = {}

onDomChange(init)

function init(node) {
  const tabSets = node.querySelectorAll('[data-tabs]')

  if (tabSets.length > 0) {
    ;[...tabSets].map((set) => {
      const setId = set.getAttribute('data-tabs')
      const tabsInSet = [...set.querySelectorAll('[data-tab]')]
      const triggersInSet = [...set.querySelectorAll('[data-tab-trigger]')]
      const activeTabInSet = getActiveTabElem(tabsInSet)

      sets[setId] = {
        tabs: tabsInSet,
        triggers: triggersInSet,
        active: activeTabInSet,
      }

      if (tabsInSet.length === 0) {
        return
      }
      // Activate the first tab if none are already active
      if (activeTabInSet === undefined) {
        const firstTabId = getId(tabsInSet[0])

        activate(firstTabId, setId)
      }

      // Attach click handlers
      triggersInSet.map((trigger) =>
        trigger.addEventListener('click', () => {
          const tabId = trigger.getAttribute('data-tab-trigger')

          deactivateAllTabs(setId)
          activate(tabId, setId)
        })
      )

      // Adds 'is-last' class to last tab in set
      setClassForLastTab(setId)
    })
  }
}

function activate(tabId, setId) {
  const set = document.querySelector(`[data-tabs='${setId}']`)
  const tabInSet = getTabElem(tabId, set)
  const triggerInSet = getTriggerElem(tabId, set)

  sets[setId].active = tabInSet
  tabInSet.classList.remove('sc-hide')
  if (triggerInSet) {
    triggerInSet.classList.toggle('is-active')
  }
}

function deactivateAllTabs(setId) {
  sets[setId].tabs.map((tab) => tab.classList.add('sc-hide'))
  sets[setId].triggers.map((trigger) => trigger.classList.remove('is-active'))
}

function getId(tab) {
  return tab.getAttribute('data-tab')
}

function getTabElem(id, set) {
  return set.querySelector(`[data-tab='${id}']`)
}

function getTriggerElem(id, set) {
  return set.querySelector(`[data-tab-trigger='${id}']`)
}

function getActiveTabElem(tabsInSet) {
  return tabsInSet.filter((tab) => !tab.classList.contains('sc-hide'))[0]
}

function setClassForLastTab(setId) {
  const tabsInSet = sets[setId].tabs
  const lastTabInSet = tabsInSet[tabsInSet.length - 1]

  lastTabInSet.classList.add('is-last')
}
