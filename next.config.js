const withCSS = require('@zeit/next-css')

require('./env.js')

module.exports = withCSS({
    env: {
        firebase_auth_domain: process.env.firebase_auth_domain,
        firebase_database_url: process.env.firebase_database_url,
        firebase_project_id: process.env.firebase_project_id,
        firebase_public_api_key: process.env.firebase_public_api_key
    }
})