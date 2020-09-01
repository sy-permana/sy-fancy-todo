const { Todo } = require('../models');

async function authorization(req, res, next) {
    const { id } = req.params;
    const userId = req.loggedInUser.id;
    try {
        let data = await Todo.findByPk(id);
        if(!data) 
            throw { name : 'TODO_NOT_FOUND' }
        else if (data.userId === userId)
            next()
        else
            throw { name : 'AUTHORIZATION_FAILED' }
    } catch (err) {
        next(err)
    }
}

module.exports = authorization;