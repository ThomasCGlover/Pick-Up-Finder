const validateSession = require('./validate-jwt')

module.exports = {
    headers: require('./headers'),
    validateSession: require('./validate-jwt'),
}