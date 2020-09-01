const { Todo } = require('../models');

async function authorization(req, res, next) {
    const { id } = req.params;
    const userId = req.loggedInUser.id;
    try {
        let data = await Todo.findByPk(id);
        if(!data) 
            throw { msg : 'Todo not found', status : 404 }
        else if (data.userId === userId)
            next()
        else
            throw { msg : 'not authorized', status : 401 }
    } catch (err) {
        console.log(err)
        const status = err.stats || 500;
        const msg = err.msg || 'internal server error';
        res.status(status).json({ error : msg })
    }
}

module.exports = authorization;