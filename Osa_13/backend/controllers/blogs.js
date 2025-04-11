const router = require('express').Router()
const { Op } = require("sequelize")

const { tokenExtractor } = require('../util/middleware')
const { Blog, User, Session } = require('../models')

const printBlogs = (blogs) => {
    blogs.map(blog =>
        console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
    )
}

router.get('/', async (req, res) => {
    let where = {}
    if (req.query.search) {
        where = { 
            [Op.or]: [
                { title: { [Op.iLike]: '%' + req.query.search + '%' }}, 
                { author: { [Op.iLike]: '%' + req.query.search + '%' }}
            ] 
        }
    }
    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name']
        },
        where: where,
        order: [['likes', 'DESC']]
    })
    printBlogs(blogs)
    res.json(blogs)
})


router.post('/', tokenExtractor, async (req, res, next) => {
    const session = await Session.findOne({
        where: {
            userId: req.decodedToken.id
        }
    })

    if (session) {
        try {
            const user = await User.findByPk(req.decodedToken.id)
            const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
            return res.json(blog)
        } catch(error) {
            next(error)
        }
    } else {
        return response.status(400).json({
            error: 'User is not logged in'
        })
    }
})

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
    const session = await Session.findOne({
        where: {
            userId: req.decodedToken.id
        }
    })

    try {
        if (req.blog && req.session && req.blog.userId === req.decodedToken.id) {
            await req.blog.destroy()
        }
        res.status(204).end()
    } catch(error) {
        next(error)
    }
})

router.put('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})

module.exports = router