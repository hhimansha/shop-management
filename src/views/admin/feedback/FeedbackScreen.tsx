import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Modal, Box, TextField } from '@mui/material';

const FeedbackScreen = () => {
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, userId: 'user123', name: 'John Doe', email: 'john@example.com', rating: 5, date: '2023-10-01' },
    // Add more feedback records as needed
  ]);

  const [open, setOpen] = useState(false);
  const [newFeedback, setNewFeedback] = useState({ id: '', userId: '', name: '', email: '', rating: '', date: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback({ ...newFeedback, [name]: value });
  };

  const handleSave = () => {
    setFeedbacks([...feedbacks, { ...newFeedback, id: feedbacks.length + 1 }]);
    handleClose();
  };

  const handleUpdate = (id) => {
    // Logic to update feedback
  };

  const handleDelete = (id) => {
    // Logic to delete feedback
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
            Add Feedback
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
                <TableCell>User ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell>{feedback.id}</TableCell>
                  <TableCell>{feedback.userId}</TableCell>
                  <TableCell>{feedback.name}</TableCell>
                  <TableCell>{feedback.email}</TableCell>
                  <TableCell>{feedback.rating}</TableCell>
                  <TableCell>{feedback.date}</TableCell>
                  <TableCell
                    sx={{
                      display: 'flex',
                      gap: 2,
                    }}
                  >
                    <Button variant="contained" color="primary" onClick={() => handleUpdate(feedback.id)}>
                      Update
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(feedback.id)}>
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
          <h2>Add Feedback</h2>
          <TextField
            label="User ID"
            name="userId"
            value={newFeedback.userId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            name="name"
            value={newFeedback.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newFeedback.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Rating"
            name="rating"
            value={newFeedback.rating}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            name="date"
            value={newFeedback.date}
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

export default FeedbackScreen;