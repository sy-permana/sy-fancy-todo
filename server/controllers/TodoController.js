const { Todo } = require('../models');

class TodoController {
    static async readAll(req, res) {
        const userId = req.loggedInUser.id;
        try {
            const data = await Todo.findAll({
                where : {
                    userId
                }
            })
            res.status(200).json({ todos : data })
        } catch (err) {
            console.log(err)
            let error = err.errors ? err.errors[0].message : 'internal server error';
            res.status(500).json({ error })
        }
    }
    static async create(req, res){
        try {
            const { title, description, status, due_date } = req.body;
            const userId = req.loggedInUser.id;
            const data = await Todo.create({
                title,
                description,
                status,
                due_date,
                userId
            })
            res.status(201).json({ 
                msg : 'creating new Todo success',
                todo : data 
            })
        } catch (err) {
            let error = err;
            res.status(500).json({ error })
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const userId = req.loggedInUser.id;
            const { title, description, status, due_date } = req.body;
            const data = await Todo.update({ 
                title,
                description,
                status,
                due_date
             },{
                where : {
                    id,
                    userId
                }
            });
            res.status(200).json({
                msg : `todo with id ${id} has been updated`,
            })
        } catch (err) {
            let error = err
            let status = err.status || 500
            res.status(status).json({ error })
        }
    }
    static async destroy(req, res) {
        try {
            let { id } = req.params;
            Todo.destroy({
                where : {
                    id
                }
            })
            res.status(200).json({
                msg : 'success delete'
            })
        } catch (err) {
            let error = err
            res.status(500).json({ error })
        }
    }
}

module.exports = TodoController;