const { Todo } = require('../models');

class TodoController {
    static async readAll(req, res, next) {
        const userId = req.loggedInUser.id;
        try {
            const data = await Todo.findAll({
                where : {
                    userId
                }
            })
            res.status(200).json({ todos : data })
        } catch (err) {
            next(err)
        }
    }
    static async create(req, res, next){
        try {
            const status = false;
            const userId = req.loggedInUser.id;
            const { title, description, due_date } = req.body;
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
            next(err)
        }
    }
    static async update(req, res, next) {
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
            next(err);
        }
    }
    static async destroy(req, res, next) {
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
            next(err);
        }
    }
}

module.exports = TodoController;