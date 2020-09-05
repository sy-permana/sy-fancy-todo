const axios = require('axios').default;

class ApiController {
    static async getRandom(req, res, next) {
        try {
            const response = await axios.get('https://api.adviceslip.com/advice');
            res.status(200).json(response.data)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ApiController