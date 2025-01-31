const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'julkinen')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')

      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'a blog created by blogger', 'B. Blogger', 'www.b-blogger.be')
      await expect(page.getByTestId('visible-content')).toBeVisible()
    })
  })

    describe('When a blog has been added', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
        await createBlog(page, 'a blog created by blogger', 'B. Blogger', 'www.b-blogger.be')
      })

      test('likes can be added', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('user who created the blog can delete it', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByTestId('visible-content')).not.toBeVisible()
      })
  })

  describe('When two users have been added', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Hannu Hanhi',
          username: 'hhanhi',
          password: 'ankkalinna'
        }
      })
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, 'a blog created by blogger', 'B. Blogger', 'www.b-blogger.be')
    })

    test('user who created the blog can see the delete button', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
    })

    test('user who did not create the blog can not see the delete button', async ({ page }) => {
      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'hhanhi', 'ankkalinna')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
  })

  describe('When multiple blogs are added', () => {
    beforeEach(async ({ page, request }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, 'blog with no likes', 'B. Blogger', 'www.b-blogger.be')
      await createBlog(page, 'blog with one like', 'A. Blogger', 'www.a-blogger.cia')
    })

    test('blogs are ordered based on the number of likes', async ({ page }) => {
      const blogsBeforeLikes = await page.getByTestId('visible-content').all()
      console.log('length: ' + blogsBeforeLikes.length)
      await expect(blogsBeforeLikes[0].getByText('blog with no likes')).toBeVisible()
      await expect(blogsBeforeLikes[1].getByText('blog with one like')).toBeVisible()

      const viewButtons = await page.getByRole('button', { name: 'view' }).all()
      await viewButtons[1].click()

      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'hide' }).click()

      const blogsAfterLikes = await page.getByTestId('visible-content').all()
      await expect(blogsAfterLikes[0].getByText('blog with one like')).toBeVisible()
      await expect(blogsAfterLikes[1].getByText('blog with no likes')).toBeVisible()      
    })
  })
})