import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import { handleTablePagination } from "../services/payments";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables({ data }) {
  const classes = useStyles();
  console.log("Data ::", data);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableRows, setTableRows] = useState(data);

  const handleChangePage = async (event, page) => {
    console.log(event);
    const res = await handleTablePagination(rowsPerPage, page);
    console.log("handle pagination", res.body);
    setTableRows([...res.body]);
    setCurrentPage(page + 1);
  };

  const handleChangeRowsPerPage = (event) => {};

  const headers = tableRows.reduce((output, entry) => {
    const result = output;
    Object.keys(entry).map((key) => {
      if (!result.includes(key)) result.push(key);
    });
    return result;
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {headers.map((key) => {
                return (
                  <StyledTableCell>
                    {
                      // Convert camelcased values to uppercased values to be used as
                      // dynamic headers
                      key.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
                        return str.toUpperCase();
                      })
                    }
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row) => (
              <StyledTableRow key={row.name}>
                {headers.map((key) => {
                  return <StyledTableCell>{row[key]}</StyledTableCell>;
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={200} rowsPerPage={rowsPerPage} page={currentPage} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
    </>
  );
}
