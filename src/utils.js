const fse = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')

const currentDir = process.cwd()
const sourceRootDir = path.join(__dirname, '..')

const selectLanguage = async () => {
  const { language } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Pick the language you want to use:',
      name: 'language',
      choices: ['javascript', 'typescript'],
    },
  ])

  return language
}

const selectApp = async () => {
  const { app } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Pick the app you want to use:',
      name: 'app',
      choices: ['node', 'express'],
    },
  ])

  return app
}

const installApp = async () => {
  try {
    const language = await selectLanguage()
    const app = await selectApp()

    console.log('🍊 Installing app ...')

    const source = path.join(
      sourceRootDir,
      `apps/${language}/${app}`,
    )

    fse.copySync(source, currentDir)
  } catch (e) {
    throw Error(`Could not install app: ${e}`)
  }
}

const displaySuccessMessage = () => {
  console.log('')
  console.log('💫 App was installed successfully!')
  console.log(
    '   It is recommended to add these plugins to your IDE:',
  )
  console.log('   🔹 ESLint')
  console.log('   🔹 Prettier')
  console.log('   🔹 EditorConfig')
}

const displayErrorMessage = error => {
  console.log('')
  console.error(`❌ ${error.message}`)
  console.log('')
  console.log(
    'To get help with this problem, please submit an issue to: ',
  )
  console.log(
    'https://github.com/iampika/create-pika-app/issues',
  )
  console.log('')
}

module.exports = {
  installApp,
  displaySuccessMessage,
  displayErrorMessage,
}
