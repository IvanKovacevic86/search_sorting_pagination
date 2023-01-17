import {
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Box, Container } from "@mui/system";

const columns = [
  { label: "FullName", id: "fullName" },
  { label: "Address", id: "address" },
  { label: "Email", id: "email" },
  { label: "PhoneNumber", id: "phoneNumber" },
];

function App() {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState("");
  const pages = [5, 10, 20];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[0]);

  const fetchUsers = () => {
    axios.get(`http://localhost:3004/users`).then((response) => {
      setUsers(response.data);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleReset = () => {
    fetchUsers();
  };

  const handleSearch = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:3004/users?q=${value}`)
      .then((res) => setUsers(res.data));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <form onSubmit={handleSearch} sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3rem",
            marginBottom: "3rem",
          }}
        >
          <TextField
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search by Name or Email"
            variant="standard"
            sx={{
              width: "30%",
              backgroundColor: "#F0F0F0",

              border: "none",
            }}
          />
          <Box sx={{ marginLeft: "2rem" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginRight: "1rem" }}
            >
              Search
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleReset()}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </form>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#D3D3D3",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            backgroundColor: "lightBlue",
          }}
        >
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ backgroundColor: "#D3D3D3" }}>
            <TablePagination
              page={page}
              rowsPerPageOptions={pages}
              rowsPerPage={rowsPerPage}
              count={users.length}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
}

export default App;
