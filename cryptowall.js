'use strict'

const Express = require('express')
const webtask = require('webtask-tools')
const crypto = require('crypto')
const Joi = require('joi')

const ENCRYPTION_SCHEMA = Joi.object({
  text: Joi.string().required(),
  password: Joi.string().required()
})

const DECRYPTION_SCHEMA = Joi.object({
  input: Joi.string().hex().required(),
  password: Joi.string().required()
})

/**
 * Encrypts a text using a password and AES-256 cipher
 * @param {String} text The text to be encrypted
 * @param {String} password The password
 * @return {String} A HEX encoded string
 */
function encrypt (text, password) {
  const cipher = crypto.createCipher('aes256', password)
  const encrypted = cipher.update(text, 'utf8', 'hex')

  return encrypted + cipher.final('hex')
}

/**
 * Decrypts a HEX encoded string into it's original text
 * @param {String} input A HEX encoded string
 * @param {String} password The password used when encrypting
 * @return {String} The original text
 */
function decrypt (input, password) {
  const decipher = crypto.createDecipher('aes256', password)
  const decrypted = decipher.update(input, 'hex', 'utf8')

  return decrypted + decipher.final('utf8')
}

const app = Express()

app.use(require('body-parser').json())

app.post('/encrypt', (req, res) => {
  const validate = Joi.validate(req.body, ENCRYPTION_SCHEMA)

  if (validate.error) {
    return res.status(422).json({
      error: true,
      code: 422,
      message: 'Received invalid payload',
      details: validate.error.details
    })
  }

  res.json({
    result: encrypt(validate.value.text, validate.value.password)
  })
})

app.post('/decrypt', (req, res) => {
  const validate = Joi.validate(req.body, DECRYPTION_SCHEMA)

  if (validate.error) {
    return res.status(422).json({
      error: true,
      code: 422,
      message: 'Received invalid payload',
      details: validate.error.details
    })
  }

  try {
    res.json({
      result: decrypt(validate.value.input, validate.value.password)
    })
  } catch (err) {
    res.status(422).json({
      error: true,
      code: 422,
      message: err.message
    })
  }
})

app.all('*', (req, res) => {
  res.status(404).json({
    error: true,
    code: 404,
    message: 'The requested resource was not found'
  })
})

module.exports = webtask.fromExpress(app)
