const handleFetchErrors = res =>
  res
    .clone()
    .json()
    .then(err => err.message)
    .catch(() => res.text())
    .then(message => {
      throw new Error(message)
    })
const handleBlobResponse = res => (res.ok ? res.blob() : handleFetchErrors(res))

function siteShot() {
  const page = encodeURIComponent(document.querySelector('[name="page"]').value)
  const shot = document.querySelector('#shot')
  shot.src = ''
  shot.alt = 'Loading screenshot...'
  return fetch(`/api/shot/${page || 'jt.houk.space'}`)
    .then(handleBlobResponse)
    .then(blob => {
      const blobUrl = URL.createObjectURL(blob)
      shot.src = blobUrl
    })
    .catch(err => {
      shot.alt = err.message
    })
}
document.querySelector('#site-shot-api').addEventListener('click', siteShot)
