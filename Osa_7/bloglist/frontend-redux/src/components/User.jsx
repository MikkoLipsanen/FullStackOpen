import { StyledTableCell, StyledTableRow } from '../materialUI'
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableContainer,
    Card,
    CardContent,
    Typography,
    Paper
} from '@mui/material'

const User = ({ user }) => {
    if (!user) {
        return null
    }
    
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h4" component="div">
                        {user.name}
                    </Typography>
                </CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Added blogs</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user.blogs.map((blog) => (
                                <StyledTableRow key={blog.id}>
                                    <StyledTableCell>{blog.title}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
}

export default User