// Strip a free-text money input to a positive value: digits with at most one
// decimal point and `maxDecimals` places (no sign/exponent). Runs on `input`, so
// it also sanitizes pasted content.
export function sanitizeDecimal(raw, maxDecimals = 2) {
  let value = (raw || '').replace(/[^\d.]/g, '')
  const dot = value.indexOf('.')
  if (dot !== -1) {
    const whole = value.slice(0, dot)
    const fraction = value
      .slice(dot + 1)
      .replace(/\./g, '')
      .slice(0, maxDecimals)
    value = `${whole}.${fraction}`
  }
  return value
}

// Attach currency sanitization to a text input. Returns the resolved decimals.
export function attachCurrencySanitizer(input, maxDecimals = 2) {
  const decimals = parseInt(input.dataset.decimals, 10) || maxDecimals
  input.addEventListener('input', () => {
    const sanitized = sanitizeDecimal(input.value, decimals)
    if (sanitized !== input.value) input.value = sanitized
  })
  return decimals
}
