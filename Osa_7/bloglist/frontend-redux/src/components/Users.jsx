import { Link } from 'react-router-dom'

import {
    Table,
    TableHead,
    TableBody,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material'

import { StyledTableCell, StyledTableRow } from '../materialUI'

const Users = ({ users }) => {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>User</StyledTableCell>
                            <StyledTableCell>Blogs created</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell><Link to={`/users/${user.id}`}>{user.name}</Link></StyledTableCell>
                                <StyledTableCell>{user.blogs.length}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}


export default Users
