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
import React, { useState } from 'react';

const SupplierScreen = () => {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Supplier A', address: '123 Supplier St', mobile: '123-456-7890', itemId: 'item123', email: 'supplierA@example.com', company: 'Company A' },
    // Add more supplier records as needed
  ]);

  const [open, setOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState({ id: '', name: '', address: '', mobile: '', itemId: '', email: '', company: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({ ...newSupplier, [name]: value });
  };

  const handleSave = () => {
    setSuppliers([...suppliers, { ...newSupplier, id: suppliers.length + 1 }]);
    handleClose();
  };

  const handleUpdate = (id) => {
    // Logic to update supplier
  };

  const handleDelete = (id) => {
    // Logic to delete supplier
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: 5 }}>
        <Paper
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 5,
            backgroundColor: 'inherit',
            border: 'none',
            boxShadow: 'none',
          }}
        >
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add Supplier
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
                <TableCell>Address</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Item ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>{supplier.id}</TableCell>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell>{supplier.mobile}</TableCell>
                  <TableCell>{supplier.itemId}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.company}</TableCell>
                  <TableCell
                    sx={{
                      display: 'flex',
                      gap: 2,
                    }}
                  >
                    <Button variant="contained" color="primary" onClick={() => handleUpdate(supplier.id)}>
                      Update
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(supplier.id)}>
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
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Add Supplier</h2>
          <TextField
            label="Name"
            name="name"
            value={newSupplier.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={newSupplier.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mobile"
            name="mobile"
            value={newSupplier.mobile}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Item ID"
            name="itemId"
            value={newSupplier.itemId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newSupplier.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Company"
            name="company"
            value={newSupplier.company}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
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

export default SupplierScreen;
