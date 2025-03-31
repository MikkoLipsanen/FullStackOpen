import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders content', () => {
    const todo = {
        text: 'Do component testing with react-testing-library',
        done: false
    }

    const mockDeleteHandler = vi.fn()
    const mockCompleteHandler = vi.fn()

    render(<Todo todo={todo} onClickDelete={mockDeleteHandler} onClickComplete={mockCompleteHandler} />)

    const element = screen.getByText('Do component testing with react-testing-library')
    expect(element).toBeDefined()
})