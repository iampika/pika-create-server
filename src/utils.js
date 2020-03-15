const fse = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const cp = require('child_process')

const currentDir = process.cwd()
const sourceRootDir = path.join(__dirname, '..')

const selectPackageManager = async () => {
  const { manager } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Pick the package manager you want to use:',
      name: 'manager',
      choices: ['yarn', 'npm'],
    },
  ])

  return manager
}

const selectLanguage = async () => {
  const { language } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Pick the language you want to use:',
      name: 'language',
      choices: ['typescript', 'javascript'],
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

const installPackages = async () => {
  try {
    const manager = await selectPackageManager()
    console.log('🍉 Installing packages ...')
    cp.execSync(`cd server && ${manager} install`)
    if (manager === 'npm')
      cp.execSync(`cd server && rm -rf yarn.lock`)
  } catch (e) {
    throw Error(`Could not install packages.`)
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
    'https://github.com/iampika/pika-create-server/issues',
  )
  console.log('')
}

module.exports = {
  installApp,
  installPackages,
  displaySuccessMessage,
  displayErrorMessage,
}
