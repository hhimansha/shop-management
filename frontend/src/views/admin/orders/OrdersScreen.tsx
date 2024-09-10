import React, { useState, useMemo } from "react";
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
import { useOrder } from "../../../hooks/useOrder";
import { Order } from "../../../context/orderContext";

const OrdersScreen = () => {
  const { orders, addOrder, updateOrder, deleteOrder } = useOrder();
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentOrder, setCurrentOrder] = useState({
    _id: "",
    name: "",
    address: "",
    mobile: "",
    totalAmount: 0,
    user: "",
    items: [
      {
        itemId: "",
        _id: "",
      },
    ],
    status: "",
    assignedDriver: "",
  });

  // Filter orders based on search term
  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  const handleOpen = () => {
    setIsUpdate(false);
    setCurrentOrder({
      _id: "",
      name: "",
      address: "",
      mobile: "",
      totalAmount: 0,
      user: "",
      items: [
        {
          itemId: "",
          _id: "",
        },
      ],
      status: "",
      assignedDriver: "",
    });
    setOpen(true);
  };

  const handleUpdateOpen = (order: Order) => {
    setIsUpdate(true);
    setCurrentOrder(order);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentOrder({ ...currentOrder, [name]: value });
  };

  const handleSave = async () => {
    if (isUpdate) {
      if (await updateOrder(currentOrder)) {
        alert("Order updated successfully");
        handleClose();
      } else {
        alert("Failed to update order");
      }
    } else {
      if (await addOrder(currentOrder)) {
        alert("Order added successfully");
        handleClose();
      } else {
        alert("Failed to add order");
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
            Add Order
          </Button>
          <TextField
            label="Search orders"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Item ID</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Final Status</TableCell>
                <TableCell>Assigned Driver</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  {/* <TableCell>{order._id}</TableCell> */}
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.mobile}</TableCell>
                  <TableCell>
                    {order.items.map((item) => item.itemId).join(", ")}
                  </TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.assignedDriver}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateOpen(order)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "red" }}
                      onClick={() => deleteOrder(order._id)}
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
          <h2>{isUpdate ? "Update Order" : "Add Order"}</h2>
          <TextField
            label="Name"
            name="name"
            value={currentOrder.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={currentOrder.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact No"
            name="mobile"
            value={currentOrder.mobile}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Item ID"
            name="itemId"
            value={currentOrder.items.map((item) => item.itemId).join(", ")}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Total"
            name="totalAmount"
            type="number"
            value={currentOrder.totalAmount}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Final Status"
            name="status"
            value={currentOrder.status}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
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

export default OrdersScreen;
