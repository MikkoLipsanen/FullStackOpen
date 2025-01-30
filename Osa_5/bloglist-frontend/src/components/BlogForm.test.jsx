import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')
  const sendButton = screen.getByText('add')

  await user.type(titleInput, 'testing a form...')
  await user.type(authorInput, 'John D. Form')
  await user.type(urlInput, 'www.form.com')

  await user.click(sendButton)

  // console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
  expect(createBlog.mock.calls[0][0].author).toBe('John D. Form')
  expect(createBlog.mock.calls[0][0].url).toBe('www.form.com')
})