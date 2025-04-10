const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize")

const { Blog, User } = require('../models')
const { SECRET } = require('../util/config')

const printBlogs = (blogs) => {
    blogs.map(blog =>
        console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
    )
}

router.get('/', async (req, res) => {
    let where = {}
    console.log(req.query.search)
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

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        console.log(authorization.substring(7))
        console.log(SECRET)
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      } catch (error) {
        console.log(error)
        return res.status(401).json({ error: 'token invalid' })
      }
    } else {
      return res.status(401).json({ error: 'token missing' })
    }
  
    next()
}

router.post('/', tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
        return res.json(blog)
    } catch(error) {
        next(error)
    }
})

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/:id', blogFinder, async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        res.json(blog)
    } else {
        res.status(404).end()
    }
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if (blog && blog.userId === req.decodedToken.id) {
            await blog.destroy()
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