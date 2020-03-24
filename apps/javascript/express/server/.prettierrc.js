const { prettierConfig } = require('poetic')

module.exports = {
  ...prettierConfig,
  // Add custom rules here
  semi: false,
  printWidth: 65,
}
