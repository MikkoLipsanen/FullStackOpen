import { Link } from 'react-router-dom'

import {
    styled,
    Table,
    TableHead,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material'


const Blogs = ({ blogs }) => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }))

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }))

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Blogs</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blogs.map((blog) => (
                            <StyledTableRow key={blog.id}>
                                <StyledTableCell>
                                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Blogs
