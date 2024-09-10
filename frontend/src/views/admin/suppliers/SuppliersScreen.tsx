import { useState } from "react";
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
import { useSupplier } from "../../../hooks/useSupplier";
import { Supplier } from "../../../context/supplierContext";

const SupplierScreen = () => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } =
    useSupplier();
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState({
    _id: "",
    name: "",
    address: "",
    mobile: "",
    itemId: "",
    email: "",
    company: "",
  });

  const handleOpen = () => {
    setIsUpdate(false);
    setCurrentSupplier({
      _id: "",
      name: "",
      address: "",
      mobile: "",
      itemId: "",
      email: "",
      company: "",
    });
    setOpen(true);
  };

  const handleUpdateOpen = (supplier: Supplier) => {
    setIsUpdate(true);
    setCurrentSupplier(supplier);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentSupplier({ ...currentSupplier, [name]: value });
  };

  const handleSave = async () => {
    if (isUpdate) {
      await updateSupplier(currentSupplier).then((success) => {
        if (success) {
          alert("Supplier updated successfully");
          handleClose();
        } else {
          alert("Failed to update supplier");
        }
      });
    } else {
      await addSupplier(currentSupplier).then((success) => {
        if (success) {
          alert("Supplier added successfully");
          handleClose();
        } else {
          alert("Failed to add supplier");
        }
      });
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
            Add Supplier
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
                <TableCell>Mobile</TableCell>
                <TableCell>Item ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier._id}>
                  {/* <TableCell>{supplier._id}</TableCell> */}
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell>{supplier.mobile}</TableCell>
                  <TableCell>{supplier.itemId}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.company}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateOpen(supplier)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "red" }}
                      onClick={async () => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this supplier?"
                          )
                        ) {
                          if (await deleteSupplier(supplier._id)) {
                            alert("Supplier deleted successfully");
                          } else {
                            alert("Failed to delete supplier");
                          }
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
          <h2>{isUpdate ? "Update Supplier" : "Add Supplier"}</h2>
          <TextField
            label="Name"
            name="name"
            value={currentSupplier.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={currentSupplier.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mobile"
            name="mobile"
            value={currentSupplier.mobile}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Item ID"
            name="itemId"
            value={currentSupplier.itemId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={currentSupplier.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Company"
            name="company"
            value={currentSupplier.company}
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

export default SupplierScreen;
