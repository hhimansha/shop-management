import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Modal, Box, TextField } from '@mui/material';

const DeliveryScreen = () => {
  const [deliveries, setDeliveries] = useState([
    { id: 1, name: 'John Doe', address: '123 Main St', contact: '123-456-7890', vehicleNo: 'ABC123', category: 'Electronics', orderStatus: 'Delivered' },
    // Add more delivery records as needed
  ]);

  const [open, setOpen] = useState(false);
  const [newDelivery, setNewDelivery] = useState({ id: '', name: '', address: '', contact: '', vehicleNo: '', category: '', orderStatus: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDelivery({ ...newDelivery, [name]: value });
  };

  const handleSave = () => {
    setDeliveries([...deliveries, { ...newDelivery, id: deliveries.length + 1 }]);
    handleClose();
  };

  const handleUpdate = (id) => {
    // Logic to update delivery
  };

  const handleDelete = (id) => {
    // Logic to delete delivery
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
            Add Delivery
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
                <TableCell>Contact No</TableCell>
                <TableCell>Vehicle No</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell>{delivery.id}</TableCell>
                  <TableCell>{delivery.name}</TableCell>
                  <TableCell>{delivery.address}</TableCell>
                  <TableCell>{delivery.contact}</TableCell>
                  <TableCell>{delivery.vehicleNo}</TableCell>
                  <TableCell>{delivery.category}</TableCell>
                  <TableCell>{delivery.orderStatus}</TableCell>
                  <TableCell
                    sx={{
                      display: 'flex',
                      gap: 2,
                    }}
                  >
                    <Button variant="contained" color="primary" onClick={() => handleUpdate(delivery.id)}>
                      Update
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(delivery.id)}>
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
          <h2>Add Delivery</h2>
          <TextField
            label="Name"
            name="name"
            value={newDelivery.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={newDelivery.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact No"
            name="contact"
            value={newDelivery.contact}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Vehicle No"
            name="vehicleNo"
            value={newDelivery.vehicleNo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={newDelivery.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Order Status"
            name="orderStatus"
            value={newDelivery.orderStatus}
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

export default DeliveryScreen;