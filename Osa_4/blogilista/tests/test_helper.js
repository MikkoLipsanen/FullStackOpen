const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title": "To blog or not to",
        "author": "Mr. Bojangles",
        "url": "www.toblogornot.com",
        "likes": 67
    },
    {
        "title": "Cars, pt. 2",
        "author": "Marty McFly",
        "url": "www.2thefuture.com",
        "likes": 69007
    }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}