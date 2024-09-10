import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { useCustomer } from "../../../hooks/useCustomer";
import { Customer } from "../../../context/customerContext";

const CustomerScreen = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer } =
    useCustomer();
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({
    _id: 0,
    username: "",
    firstname: "",
    lastname: "",
    mobilenumber: "",
    address: "",
    email: "",
    role: "customer",
    password: "",
  });

  const handleOpen = () => {
    setIsUpdate(false);
    setCurrentCustomer({
      _id: 0,
      username: "",
      firstname: "",
      lastname: "",
      mobilenumber: "",
      address: "",
      email: "",
      role: "customer",
      password: "",
    });
    setOpen(true);
  };

  const handleUpdateOpen = (customer: Customer) => {
    setIsUpdate(true);
    setCurrentCustomer(customer);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  const handleSave = async () => {
    if (isUpdate) {
      if (await updateCustomer(currentCustomer)) {
        alert("Customer updated successfully");
        handleClose();
      } else {
        alert("Customer update failed");
      }
    } else {
      if (await addCustomer(currentCustomer)) {
        alert("Customer added successfully");
        handleClose();
      } else {
        alert("Customer add failed");
      }
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: 5 }}>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 5,
            backgroundColor: "inherit",
            border: "none",
            boxShadow: "none",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add Customer
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => window.print()}
          >
            Print Report
          </Button>
        </Paper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell>ID</TableCell> */}
                <TableCell>Username</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map(
                (customer) =>
                  customer.role === "customer" && (
                    <TableRow key={customer._id}>
                      {/* <TableCell>{customer._id}</TableCell> */}
                      <TableCell>{customer.username}</TableCell>
                      <TableCell>{customer.firstname}</TableCell>
                      <TableCell>{customer.lastname}</TableCell>
                      <TableCell>{customer.mobilenumber}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell
                        sx={{
                          display: "flex",
                          gap: 2,
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleUpdateOpen(customer)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "red" }}
                          onClick={() => {
                            if (window.confirm("Are you sure?")) {
                              deleteCustomer(customer._id);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>{isUpdate ? "Update Customer" : "Add Customer"}</h2>
          <TextField
            label="Name"
            name="username"
            value={currentCustomer.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="First Name"
            name="firstname"
            value={currentCustomer.firstname}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastname"
            value={currentCustomer.lastname}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact No"
            name="mobilenumber"
            value={currentCustomer.mobilenumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={currentCustomer.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={currentCustomer.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {!isUpdate ? (
            <TextField
              label="Password"
              name="password"
              value={currentCustomer.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          ) : null}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CustomerScreen;
