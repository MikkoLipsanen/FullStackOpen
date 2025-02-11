import { Link } from 'react-router-dom'



const Blogs = ({ blogs }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    return (
        <div>
            <h2>Blogs</h2>
            {blogs.map((blog) => (
                <div style={blogStyle} key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </div>
            ))}
        </div>
    )
}

export default Blogs
