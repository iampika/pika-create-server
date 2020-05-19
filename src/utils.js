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

const selectDatabase = async () => {
  const { database } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Pick the database you want to use:',
      name: 'database',
      choices: ['none', 'mongodb', 'mongoose'],
    },
  ])

  return database
}

const selectApp = async (choices) => {
  const { app } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Pick the app you want to use:',
      name: 'app',
      choices,
    },
  ])

  return app
}

const installApp = async () => {
  try {
    const language = await selectLanguage()
    const database = await selectDatabase()
    const app =
      database === 'none'
        ? await selectApp(['node', 'express'])
        : await selectApp(['express'])

    console.log('🍊 Installing app ...')

    const source = path.join(
      sourceRootDir,
      `apps/${language}/${database}/${app}`,
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
  console.log('\n✨ App was installed successfully!\n')
  console.log(
    'It is recommended to add these plugins to your IDE:\n',
  )
  console.log('   🔹 ESLint')
  console.log('   🔹 Prettier')
  console.log('   🔹 EditorConfig')

  console.log(
    '\nInside the server directory, you can run several commands:\n',
  )
  console.log('   🔹 yarn server')
  console.log('         Starts the development server.')
  console.log('\n   🔹 yarn build')
  console.log(
    '         Bundles the app into static files for production.',
  )

  console.log('\nWe suggest that you begin by typing:\n')
  console.log('   🔹 cd server')
  console.log('   🔹 yarn server')

  console.log('\nHappy hacking!\n')
}

const displayErrorMessage = (error) => {
  console.error(`\n❌ ${error.message}\n`)
  console.log(
    'To get help with this problem, please submit an issue to: ',
  )
  console.log(
    'https://github.com/iampika/pika-create-server/issues\n',
  )
}

module.exports = {
  installApp,
  installPackages,
  displaySuccessMessage,
  displayErrorMessage,
}
