const { Todo } = require('../models')

async function authorization(req, res, next) {
  const { id } = req.params
  // get id from params
  const userId = req.loggedInUser.id
  // get id from logged in user credential
  try {
    let data = await Todo.findByPk(id)
    // find data by req params
    if (!data) throw { name: 'TODO_NOT_FOUND' }
    else if (data.userId === userId)
      // check if data is belongs to user
      // if yes then next
      next()
    else throw { name: 'AUTHORIZATION_FAILED' }
    // throw unauthorization if the item doesn't belongs to user
  } catch (err) {
    next(err)
    //error handling on middlewares
  }
}

module.exports = authorization
