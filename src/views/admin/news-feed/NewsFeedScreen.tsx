import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Modal, Box, TextField } from '@mui/material';

const NewsFeedScreen = () => {
  const [newsFeeds, setNewsFeeds] = useState([
    { id: 1, itemId: 'item123', photo: 'photo_url', discount: '10%', description: 'Sample description' },
    // Add more news feed records as needed
  ]);

  const [open, setOpen] = useState(false);
  const [newNewsFeed, setNewNewsFeed] = useState({ id: '', itemId: '', photo: '', discount: '', description: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNewsFeed({ ...newNewsFeed, [name]: value });
  };

  const handleSave = () => {
    setNewsFeeds([...newsFeeds, { ...newNewsFeed, id: newsFeeds.length + 1 }]);
    handleClose();
  };

  const handleUpdate = (id) => {
    // Logic to update news feed
  };

  const handleDelete = (id) => {
    // Logic to delete news feed
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
            Add News Feed
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
                <TableCell>Item ID</TableCell>
                <TableCell>Photo</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newsFeeds.map((newsFeed) => (
                <TableRow key={newsFeed.id}>
                  <TableCell>{newsFeed.id}</TableCell>
                  <TableCell>{newsFeed.itemId}</TableCell>
                  <TableCell>
                    <img src={newsFeed.photo} alt="news" style={{ width: '50px', height: '50px' }} />
                  </TableCell>
                  <TableCell>{newsFeed.discount}</TableCell>
                  <TableCell>{newsFeed.description}</TableCell>
                  <TableCell
                    sx={{
                      display: 'flex',
                      gap: 2,
                    }}
                  >
                    <Button variant="contained" color="primary" onClick={() => handleUpdate(newsFeed.id)}>
                      Update
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(newsFeed.id)}>
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
          <h2>Add News Feed</h2>
          <TextField
            label="Item ID"
            name="itemId"
            value={newNewsFeed.itemId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Photo URL"
            name="photo"
            value={newNewsFeed.photo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Discount"
            name="discount"
            value={newNewsFeed.discount}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={newNewsFeed.description}
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

export default NewsFeedScreen;
