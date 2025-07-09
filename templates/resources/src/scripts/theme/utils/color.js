export function getHSLFromCSSColor(element) {
  return RGBToHSL(getComputedStyle(element).color)
}

function RGBToHSL(rgb) {
  let sep = rgb.indexOf(',') > -1 ? ',' : ' '
  rgb = rgb.substr(4).split(')')[0].split(sep)

  for (let R in rgb) {
    let r = rgb[R]
    if (r.indexOf('%') > -1) rgb[R] = Math.round((r.substr(0, r.length - 1) / 100) * 255)
  }

  let r = rgb[0] / 255,
    g = rgb[1] / 255,
    b = rgb[2] / 255

  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0

  if (delta == 0) h = 0
  else if (cmax == r) h = ((g - b) / delta) % 6
  else if (cmax == g) h = (b - r) / delta + 2
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)

  if (h < 0) h += 360

  l = (cmax + cmin) / 2
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return { h: h, s: s, l: l }
}
