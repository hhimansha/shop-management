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
  MenuItem,
  Select,
} from "@mui/material";
import { useDelivery } from "../../../hooks/useDelivery";
import { Delivery } from "../../../context/deliveryContext";

const DeliveryScreen = () => {
  const { deliveries, addDelivery, updateDelivery, deleteDelivery } =
    useDelivery();
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentDelivery, setCurrentDelivery] = useState({
    _id: "",
    name: "",
    address: "",
    mobile: "",
    vehicleId: "",
    category: "",
    orderStatus: "",
    assignedOrders: [] as string[],
  });

  const handleOpen = () => {
    setIsUpdate(false);
    setCurrentDelivery({
      _id: "",
      name: "",
      address: "",
      mobile: "",
      vehicleId: "",
      category: "",
      orderStatus: "",
      assignedOrders: [] as string[],
    });
    setOpen(true);
  };

  const handleUpdateOpen = (delivery: Delivery) => {
    setIsUpdate(true);
    setCurrentDelivery({
      _id: delivery._id || "",
      name: delivery.name,
      address: delivery.address,
      mobile: delivery.mobile,
      vehicleId: delivery.vehicleId,
      category: delivery.category,
      orderStatus: delivery.orderStatus,
      assignedOrders: delivery.assignedOrders || [],
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentDelivery({ ...currentDelivery, [name]: value });
  };

  const handleSave = async () => {
    console.log(currentDelivery);
    const { _id, ...currentDeliveryWithoutId } = currentDelivery;
    if (isUpdate) {
      if (await updateDelivery({ _id, ...currentDeliveryWithoutId })) {
        handleClose();
      } else {
        alert("Failed to update delivery");
      }
    } else {
      if (await addDelivery(currentDeliveryWithoutId)) {
        handleClose();
      } else {
        alert("Failed to add delivery");
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
            Add Delivery
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
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Vehicle No</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>Assigned Orders</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery._id}>
                  {/* <TableCell>{delivery.id}</TableCell> */}
                  <TableCell>{delivery.name}</TableCell>
                  <TableCell>{delivery.address}</TableCell>
                  <TableCell>{delivery.mobile}</TableCell>
                  <TableCell>{delivery.vehicleId}</TableCell>
                  <TableCell>{delivery.category}</TableCell>
                  <TableCell>{delivery.orderStatus}</TableCell>
                  <TableCell>
                    {delivery.assignedOrders
                      ? delivery.assignedOrders.length
                      : 0}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateOpen(delivery)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "red" }}
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to delete this delivery?"
                          )
                        ) {
                          deleteDelivery(delivery._id);
                        }
                      }}
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
          <h2>{isUpdate ? "Update Delivery" : "Add Delivery"}</h2>
          <TextField
            label="Name"
            name="name"
            value={currentDelivery.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={currentDelivery.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact No"
            name="mobile"
            value={currentDelivery.mobile}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Vehicle No"
            name="vehicleId"
            value={currentDelivery.vehicleId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={currentDelivery.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Select
            label="Order Status"
            name="orderStatus"
            value={currentDelivery.orderStatus}
            onChange={(e) =>
              setCurrentDelivery({
                ...currentDelivery,
                orderStatus: e.target.value,
              })
            }
            fullWidth
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
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

export default DeliveryScreen;
