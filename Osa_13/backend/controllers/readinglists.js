const router = require('express').Router()
const sequelize = require("sequelize")
const { Readinglist, Session } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  const readinglists = await Readinglist.findAll({})
  res.json(readinglists)
})

router.post('/', tokenExtractor, async (req, res) => {
    const session = await Session.findOne({
        where: {
          userId: req.decodedToken.id
        }
    })
    if (session) {
        try {
            const readinglist = await Readinglist.create(req.body)
            res.json(readinglist)
        } catch(error) {
            return res.status(400).json({ error })
        }
    } else {
        return response.status(400).json({
            error: 'User is not logged in'
        })
    }
})

const readinglistFinder = async (req, res, next) => {
    req.readinglist = await Readinglist.findByPk(req.params.id)
    next()
}

router.get('/:id', readinglistFinder, async (req, res) => {
    if (req.readinglist) {
        res.json(req.readinglist)
    } else {
        res.status(404).end()
    }
})

router.put('/:id', readinglistFinder, tokenExtractor, async (req, res) => {
    const session = await Session.findOne({
        where: {
          userId: req.decodedToken.id
        }
    })

    if (req.readinglist && session && req.readinglist.userId === req.decodedToken.id) {
        req.readinglist.read = req.body.read
        await req.readinglist.save()
        res.json(req.readinglist)
    } else {
        res.status(404).end()
    }
})

module.exports = router