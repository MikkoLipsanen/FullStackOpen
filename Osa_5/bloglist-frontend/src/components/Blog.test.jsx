import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'R. E. Act',
    url: 'www.react.com',
    likes: 67,
    user: {
        _id: '98765',
        name: 'Jaska J.',
        username: 'jjokunen'
    }
  }

  const user = {
    name: 'Jaska J.',
    username: 'jjokunen'
  }

  const addLike = vi.fn()

  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} addLike={addLike} />).container
  })

  test('by default renders blog title and author', () => {
    const div = container.querySelector('.visibleContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('at start url, likes and user are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, url, likes and user are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('after clicking the like button twice, addLike function is called twice', async () => {
    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.dblClick(likeButton)

    expect(addLike.mock.calls).toHaveLength(2)
  })


})