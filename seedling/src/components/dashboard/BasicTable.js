import React from 'react';
import {
    TableContainer, 
    Table,  
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody, 
    Paper,
    TablePagination
} from '@mui/material';
import data from './mockData'
import ModalDelete from './ModalDelete';
import EditButton from './EditButton';


// TODO: GET DATA FOR DASHBOARD AND PUT INTO VARIABLE DATA

const headers = [
    "Claim ID",
    "First Name",
    "Last Name",
    "Expense Date",
    "Amount",
    "Purpose",
    "Follow Up",
    "Previous Claim ID",
    "Status",
    "Last Edit Claim Date",
    "",
    "",
    ""
]
  
function BasicTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function convertDateTime(isoStr) {
        const date = new Date(isoStr);
        const timestamp = date.getTime();
        const dateCopy = new Date(timestamp);
        const newDateString = dateCopy.toString().replace(" GMT+0800 (Singapore Standard Time)", "")
        return newDateString
    }

    return (
        <Paper sx={{ width: '100%' , overflow: 'hidden'}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.ClaimID}
                                </TableCell>
                                <TableCell>{row.FirstName}</TableCell>
                                <TableCell>{row.LastName}</TableCell>
                                <TableCell>{convertDateTime(row.ExpenseDate)}</TableCell>
                                <TableCell>{row.Amount}</TableCell>
                                <TableCell>{row.Purpose}</TableCell>
                                <TableCell>{row.Followup}</TableCell>
                                <TableCell>{row.PreviousClaimID}</TableCell>
                                <TableCell>{row.Status}</TableCell>
                                <TableCell>{row.LastEditClaimDate}</TableCell>
                                <TableCell>
                                   <EditButton claimID={row.ClaimID}/>
                                </TableCell>
                                <TableCell align="right">
                                   <ModalDelete claimID={row.ClaimID}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Paper>
    );
}

export default BasicTable;