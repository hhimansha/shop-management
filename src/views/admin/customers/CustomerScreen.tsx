import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Modal, Box, TextField } from '@mui/material';

const CustomerScreen = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', contact: '123-456-7890', address: '123 Main St', email: 'john@example.com' },
    // Add more customer records as needed
  ]);

  const [open, setOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ id: '', name: '', contact: '', address: '', email: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleSave = () => {
    setCustomers([...customers, { ...newCustomer, id: customers.length + 1 }]);
    handleClose();
  };

  const handleUpdate = (id) => {
    // Logic to update a customer
  };

  const handleDelete = (id) => {
    // Logic to delete a customer
  };

  const handlePrint = () => {
    window.print();
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
          <Button variant="contained" color="secondary" onClick={handlePrint}>
            Print Report
          </Button>
        </Paper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.contact}</TableCell>
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
                      onClick={() => handleUpdate(customer.id)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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
          <h2>Add Customer</h2>
          <TextField
            label="Name"
            name="name"
            value={newCustomer.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact No"
            name="contact"
            value={newCustomer.contact}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={newCustomer.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newCustomer.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CustomerScreen;
