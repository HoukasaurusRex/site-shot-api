const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const cors = require('./middleware/cors')

const app = express()
const errorHandler = (err, req, res, next) => {
  console.error(err)
  const status = err.status || 500
  const message = err.message || 'Something went wrong'
  res.status(status).send({ status: 'error', message })
}

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors)
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.render('index'))
app.get('/api/shot/:page', require('./api/shot'))

app.use(errorHandler)

module.exports = app
