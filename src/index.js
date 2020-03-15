#!/usr/bin/env node

const {
  installApp,
  displaySuccessMessage,
  displayErrorMessage,
} = require('./utils')

;(async () => {
  try {
    await installApp()
    displaySuccessMessage()
  } catch (e) {
    displayErrorMessage(e)
  }
})()
