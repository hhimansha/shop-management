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
import { useNewsFeed } from "../../../hooks/useNewsFeed";
import { NewsFeed } from "../../../context/newsFeedContext";

const NewsFeedScreen = () => {
  const { newsFeeds, addNewsFeed, updateNewsFeed, deleteNewsFeed } =
    useNewsFeed();
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentNewsFeed, setCurrentNewsFeed] = useState({
    _id: "",
    itemId: "",
    // photo: "",
    discount: "",
    description: "",
  });

  const handleOpen = () => {
    setIsUpdate(false);
    setCurrentNewsFeed({
      _id: "",
      itemId: "",
      // photo: "",
      discount: "",
      description: "",
    });
    setOpen(true);
  };

  const handleUpdateOpen = (newsFeed: NewsFeed) => {
    setIsUpdate(true);
    setCurrentNewsFeed(newsFeed);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentNewsFeed({ ...currentNewsFeed, [name]: value });
  };

  const handleSave = async () => {
    if (isUpdate) {
      if (await updateNewsFeed(currentNewsFeed)) {
        alert("News Feed updated successfully");
        handleClose();
      } else {
        alert("Failed to update news feed");
      }
    } else {
      if (await addNewsFeed(currentNewsFeed)) {
        alert("News Feed added successfully");
        handleClose();
      } else {
        alert("Failed to add news feed");
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
            Add News Feed
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
                <TableCell>Item</TableCell>
                {/* <TableCell>Photo</TableCell> */}
                <TableCell>Discount</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newsFeeds.map((newsFeed) => (
                <TableRow key={newsFeed._id}>
                  {/* <TableCell>{newsFeed._id}</TableCell> */}
                  <TableCell>{newsFeed.itemId}</TableCell>
                  {/* <TableCell>
                    <img
                      src={newsFeed.photo}
                      alt="news"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </TableCell> */}
                  <TableCell>{newsFeed.discount}</TableCell>
                  <TableCell>{newsFeed.description}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateOpen(newsFeed)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "red" }}
                      onClick={async () => {
                        if (
                          confirm(
                            "Are you sure you want to delete this news feed?"
                          )
                        ) {
                          if (await deleteNewsFeed(newsFeed._id)) {
                            alert("News Feed deleted successfully");
                          } else {
                            alert("Failed to delete news feed");
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
          <h2>{isUpdate ? "Update News Feed" : "Add News Feed"}</h2>
          <TextField
            label="Item ID"
            name="itemId"
            value={currentNewsFeed.itemId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {/* <TextField
            label="Photo URL"
            name="photo"
            value={currentNewsFeed.photo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          /> */}
          <TextField
            label="Discount"
            name="discount"
            value={currentNewsFeed.discount}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={currentNewsFeed.description}
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

export default NewsFeedScreen;
