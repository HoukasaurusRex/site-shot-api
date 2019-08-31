const puppeteer = require('puppeteer')

async function shot(url, type) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--single-process'
    ]
  })
  const page = await browser.newPage()
  await page.goto(url)
  const file = await page.screenshot({ type })
  await browser.close()
  return file
}

/**
 * Send screenshot
 * @param {Request} req
 * @param {Response} res
 */
module.exports = async (req, res, next) => {
  try {
    const { type = 'png' } = req.query
    const { page = 'jt.houk.space' } = req.params
    const uri = decodeURIComponent(page)
    const url = uri.startsWith('http') ? uri : `https://${uri}`
    const file = await shot(url, type)
    res.statusCode = 200
    res.setHeader('Content-Type', `image/\${type}`)
    res.end(file)
  } catch (err) {
    err.status = 400
    next(err)
  }
}
