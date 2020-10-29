const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
  const { access_token } = req.headers
  try {
    if (!access_token) throw { name: 'AUTHENTICATION_FAILED' }
    else {
      const decoded = verifyToken(access_token)
      const user = await User.findOne({
        where: {
          email: decoded.email
        }
      })

      if (!user) throw { name: 'AUTHENTICATION_FAILED' }
      else {
        req.loggedInUser = decoded
        next()
      }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = authentication
