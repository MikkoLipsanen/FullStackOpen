const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, 2)
    })

    test('blogs have a field called id', async () => {
        const response = await api.get('/api/blogs')
        assert('id' in response.body[0])
    })

    describe('addition of a new blog', () => {
        test('a valid blog can be added', async () => {
            const newBlog = {
                "title": "Just a test",
                "author": "Tom Tester",
                "url": "www.testthis.com",
                "likes": 11
            }
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
        
            const response = await api.get('/api/blogs')
            const titles = response.body.map(r => r.title)

            assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
            assert(titles.includes('Just a test'))  
        })

        test('if blog does not contain likes field, its value is set to 0', async () => {
            const newBlog = {
                "title": "Blog post with no likes",
                "author": "Hank Williams",
                "url": "www.dontlikeme.com"
            }

            const res = await api
                .post('/api/blogs')
                .send(newBlog)
            assert.strictEqual(res.body.likes, 0)
        })

        test('if blog does not contain title field, response has status code 400', async () => {
            const noTitleBlog = {
                "author": "Hank Williams",
                "url": "www.dontlikeme.com"
            }

            await api
                .post('/api/blogs')
                .send(noTitleBlog)
                .expect(400)
        })

        test('if blog does not contain url field, response has status code 400', async () => {
            const noUrlBlog = {
                "title": "Blog post with no likes",
                "author": "Hank Williams",
            }

            await api
                .post('/api/blogs')
                .send(noUrlBlog)
                .expect(400)
        })

        test('if blog does not contain url and title fields, response has status code 400', async () => {
            const noUrlNoTitleBlog = {
                "author": "Hank Williams",
            }

            await api
                .post('/api/blogs')
                .send(noUrlNoTitleBlog)
                .expect(400)
        })
    })

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

            const titles = blogsAtEnd.map(r => r.title)
            assert(!titles.includes(blogToDelete.title))
        })
    })
    describe('updating a blog', () => {
        test('succeeds when title field is updated', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]

            const updatedBlog = {
                ...blogToUpdate, 'title': 'Updated title'
            }

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(updatedBlog)

            const blogsInDb = await helper.blogsInDb()

            const titles = blogsInDb.map(r => r.title)
            assert(titles.includes(updatedBlog.title))
        })

        test('succeeds when author field is updated', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]

            const updatedBlog = {
                ...blogToUpdate, 'author': 'Updated A. U. Thor'
            }

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(updatedBlog)

            const blogsInDb = await helper.blogsInDb()

            const authors = blogsInDb.map(r => r.author)
            assert(authors.includes(updatedBlog.author))
        })

        test('succeeds when url field is updated', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]

            const updatedBlog = {
                ...blogToUpdate, 'url': 'www.updatedurl.fi'
            }

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(updatedBlog)

            const blogsInDb = await helper.blogsInDb()

            const urls = blogsInDb.map(r => r.url)
            assert(urls.includes(updatedBlog.url))
        })

        test('succeeds when likes field is updated', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]

            const updatedBlog = {
                ...blogToUpdate, 'likes': 9999999999999999
            }

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(updatedBlog)

            const blogsInDb = await helper.blogsInDb()

            const likes = blogsInDb.map(r => r.likes)
            assert(likes.includes(updatedBlog.likes))
        })
    })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Jo',
      name: 'Johanna',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('is shorter than the minimum allowed length (3)'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Johis',
      name: 'Johanna',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('minimum length for password is 3 characters'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('if user does not contain usernam field, response has status code 400', async () => {
    const noUsernameUser = {
        name: 'Johanna',
        password: 'salainen'
    }

    await api
        .post('/api/users')
        .send(noUsernameUser)
        .expect(400)
    })

    test('if user does not contain password field, response has status code 400', async () => {
        const noPasswordUser = {
            name: 'Johanna',
            username: 'jjohis'
        }

        await api
            .post('/api/users')
            .send(noPasswordUser)
            .expect(400)
    })

    test('if user does not contain username and password fields, response has status code 400', async () => {
        const noUsernameNoPasswordUser = {
            "name": "Hank Williams",
        }

        await api
            .post('/api/users')
            .send(noUsernameNoPasswordUser)
            .expect(400)
    })
})

after(async () => {
  await mongoose.connection.close()
})