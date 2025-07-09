import AdyenCheckout from '@adyen/adyen-web'
import '@adyen/adyen-web/dist/adyen.css'
import { init, submitData } from './common'
import { isProduction } from './form'
import { onDomChange } from '../../theme/utils/init'

onDomChange((node) => {
  const forms = node.querySelectorAll('form[data-provider="AdyenAch"]')
  forms.forEach((form) => {
    const providerId = form.dataset.providerId
    if (providerId) {
      initAdyenAch({ form, providerId })
    }
  })
})

function initAdyenAch({ form, providerId }) {
  init(form, onSubmit)

  const environment = isProduction() ? 'live' : 'test'
  const clientKey = form.dataset.apiClient
  const clientOpts = form.dataset.clientOpts ? JSON.parse(form.dataset.clientOpts) : {}

  const mountElementId = `AdyenAchFieldset${providerId}`

  let data
  let card

  function handleOnChange(state, component) {
    if (state.isValid) {
      data = state.data
    } else {
      data = {}
    }
  }

  const configuration = {
    environment,
    clientKey,
    locale: 'en_US',
    onChange: handleOnChange,
  }

  async function initializeAdyenAchForm() {
    const checkout = await AdyenCheckout(configuration)
    card = checkout
      .create('ach', {
        ...clientOpts,
        billingAddressRequired: false,
        onChange: handleOnChange,
      })
      .mount(`#${mountElementId}`)
  }

  function onSubmit() {
    const payload = {
      payment: {
        provider_id: providerId,
        method: 'Adyen',
      },
      payment_source: data.paymentMethod,
    }

    submitData({ payload })
  }

  initializeAdyenAchForm()
}
