const fs = require('fs')

const { NODE_ENV } = process.env
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  )
}

const dotEnvPath = './.env'
const dotEnvFiles = [
  `${dotEnvPath}.${NODE_ENV}.local`,
  `${dotEnvPath}.${NODE_ENV}`,
  NODE_ENV !== 'test' && `${dotEnvPath}.local`,
  dotEnvPath,
].filter(Boolean)

dotEnvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({
      path: dotenvFile,
    })
  }
})