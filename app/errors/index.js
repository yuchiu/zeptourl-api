'use strict'

const errors = require('../utils/config').constants.errors
const httpStatus = require('http-status')
const util = require('util')

class AbstractError extends Error {
  constructor (message, subs) {
    super(message)

    if (this.constructor === AbstractError) {
      throw new TypeError('Abstract class "AbstractClass" cannot be instantiated directly.')
    }

    this.name = this.constructor.name
    this.message = subs && subs.length ? util.format.apply(util, [message].concat(subs)) : message
    this.code = errors.UNKNOWN_ERROR
    this.status = httpStatus.INTERNAL_SERVER_ERROR

    Error.captureStackTrace(this, this.constructor.name)
  }
}

class InternalServerError extends AbstractError {
  constructor (message) {
    super(message, Array.prototype.slice.call(arguments, 1))

    this.code = errors.INTERNAL_SERVER_ERROR
    this.status = httpStatus.INTERNAL_SERVER_ERROR
  }
}

class NotFoundError extends AbstractError {
  constructor (message) {
    super(message, Array.prototype.slice.call(arguments, 1))

    this.code = errors.NOT_FOUND_ERROR
    this.status = httpStatus.NOT_FOUND
  }
}

class WrongContentTypeError extends AbstractError {
  constructor (message) {
    super(message, Array.prototype.slice.call(arguments, 1))

    this.code = errors.UNSUPPORTED_REQUEST_ERROR
    this.status = httpStatus.NOT_ACCEPTABLE
  }
}

class ValidationError extends AbstractError {
  constructor (message) {
    super(message, Array.prototype.slice.call(arguments, 2))

    this.code = errors.VALIDATION_ERROR
    this.status = httpStatus.BAD_REQUEST
  }
}

module.exports = {
  InternalServerError,
  NotFoundError,
  WrongContentTypeError,
  ValidationError
}
