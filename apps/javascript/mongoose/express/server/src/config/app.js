export const {
  NODE_ENV = 'development',
  PORT = 4000,
} = process.env

export const IN_PROD = NODE_ENV === 'production'
