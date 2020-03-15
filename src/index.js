#!/usr/bin/env node

const {
  installApp,
  installPackages,
  displaySuccessMessage,
  displayErrorMessage,
} = require('./utils')

;(async () => {
  try {
    await installApp()
    await installPackages()
    displaySuccessMessage()
  } catch (e) {
    displayErrorMessage(e)
  }
})()
