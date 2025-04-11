const router = require('express').Router()

const { tokenExtractor } = require('../util/middleware')
const { Session } = require('../models')

router.delete('/', tokenExtractor, async (req, res) => {
    try {
        const existingSession = await Session.findOne({
            where: {
              userId: req.decodedToken.id
            }
          })
        if (existingSession) {
            await existingSession.destroy()
        }
        res.status(204).end()
    } catch(error) {
        next(error)
    }
})

module.exports = router