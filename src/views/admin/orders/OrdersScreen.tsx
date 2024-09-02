import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Modal, Box, TextField } from '@mui/material';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([
    { id: 1, name: 'John Doe', address: '123 Main St', contact: '123-456-7890', itemId: 'item123', total: '$100', finalStatus: 'Delivered' },
    // Add more order records as needed
  ]);

  const [open, setOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({ id: '', name: '', address: '', contact: '', itemId: '', total: '', finalStatus: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleSave = () => {
    setOrders([...orders, { ...newOrder, id: orders.length + 1 }]);
    handleClose();
  };

  const handleUpdate = (id) => {
    // Logic to update order
  };

  const handleDelete = (id) => {
    // Logic to delete order
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
            Add Order
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
                <TableCell>Item ID</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Final Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.contact}</TableCell>
                  <TableCell>{order.itemId}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.finalStatus}</TableCell>
                  <TableCell
                    sx={{
                      display: 'flex',
                      gap: 2,
                    }}
                  >
                    <Button variant="contained" color="primary" onClick={() => handleUpdate(order.id)}>
                      Update
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(order.id)}>
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
          <h2>Add Order</h2>
          <TextField
            label="Name"
            name="name"
            value={newOrder.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={newOrder.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact No"
            name="contact"
            value={newOrder.contact}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Item ID"
            name="itemId"
            value={newOrder.itemId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Total"
            name="total"
            value={newOrder.total}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Final Status"
            name="finalStatus"
            value={newOrder.finalStatus}
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

export default OrdersScreen;
