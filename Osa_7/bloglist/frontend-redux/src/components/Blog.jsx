import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    TextField,
    Button,
    Table,
    TableBody,
    TableContainer,
    Card,
    CardActions,
    CardContent,
    Typography,
    Paper
} from '@mui/material'
  
import { addLike, removeBlog, addComment } from '../reducers/blogReducer'
import { StyledTableCell, StyledTableRow } from '../materialUI'

const Blog = ({ blog, user }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleteBlog = (blog) => {
        dispatch(removeBlog(blog))
        navigate('/')
    }

    const handleComment = async (event) => {
        event.preventDefault()
        const text = event.target.comment.value
        event.target.comment.value = ''
        const comment = {
            text: text,
            blogId: blog.id
        }
        dispatch(addComment(comment))
    }

    if (!blog) {
        return null
    }
  
    return (
            <div>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component={'span'}>
                            {blog.title} 
                        </Typography>
                        <br></br>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }} component={'span'}>
                            by {blog.author}
                            <br></br>
                            Added by: {blog.user.name}
                        </Typography>
                        <br></br>
                        <Typography variant="body2" component={'span'}>
                            Url: <a href={blog.url}>{blog.url}</a> 
                            <br></br>
                        </Typography>
                        <Typography variant="body2" component={'span'}>
                            {blog.likes} likes
                            <CardActions>
                                <Button size="small" variant="outlined" color="primary" onClick={() => dispatch(addLike(blog))} >
                                    Like
                                </Button>
                            </CardActions>
                            <CardActions>
                                {user.name === blog.user.name ? (
                                    <div>
                                        <Button size="small" onClick={() => deleteBlog(blog)} >
                                            Remove
                                        </Button>
                                    </div>
                                ) : null}
                    </CardActions>
                        </Typography>
                    </CardContent>
    
                </Card>
                <h3>Comments</h3>
                <form onSubmit={handleComment}>
                    <div>
                        <TextField name="comment" label="Comment" />
                    </div>
                    <div>
                        <Button variant="outlined" color="primary" type="submit">
                            Add comment
                        </Button>
                    </div>
                </form>
                <br></br>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {blog.comments.map((comment, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{comment}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
    )
}

export default Blog