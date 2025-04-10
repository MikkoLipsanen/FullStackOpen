const router = require('express').Router()
const sequelize = require("sequelize")
const { Blog } = require('../models')

router.get('/', async (req, res) => {
    const result = await Blog.findAll({
        group: ["author"],
        attributes: [
            "author",
            [sequelize.fn("COUNT", sequelize.col("id")), "articles"], 
            [sequelize.fn("SUM", sequelize.col("likes")), "likes"], 
        ],
    })
    console.log(result)
    res.json(result)
})

module.exports = router