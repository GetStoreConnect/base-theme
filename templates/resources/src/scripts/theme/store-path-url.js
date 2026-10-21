export default function (url) {
  const storePath = document.querySelector('meta[name="sc-path"]')

  if (storePath) {
    const storePathContent = storePath.content

    if (storePathContent) {
      return `/${storePathContent}${url}`
    }
  }
  return url
}
