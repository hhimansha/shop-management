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
  TextareaAutosize,
  InputLabel,
} from "@mui/material";
import { useFeedback } from "../../../hooks/useFeedback";
import { Feedback } from "../../../context/feedbackContext";

const FeedbackScreen = () => {
  const { feedbacks, addFeedback, updateFeedback, deleteFeedback } =
    useFeedback();
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<Feedback>({
    _id: "",
    userId: {
      _id: "",
      email: "",
    },
    name: "",
    email: "",
    rating: 1,
    comment: "",
    date: "",
    reply: "",
  });

  const handleOpen = () => {
    setIsUpdate(false);
    setCurrentFeedback({
      _id: "",
      userId: {
        _id: "",
        email: "",
      },
      name: "",
      email: "",
      rating: 1,
      comment: "",
      date: "",
      reply: "",
    });
    setOpen(true);
  };

  const handleUpdateOpen = (feedback: Feedback) => {
    setIsUpdate(true);
    setCurrentFeedback(feedback);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentFeedback({ ...currentFeedback, [name]: value });
  };

  const handleSave = async () => {
    if (isUpdate) {
      const result = await updateFeedback(currentFeedback);
      if (result) {
        handleClose();
        alert("Feedback reply updated successfully");
      } else {
        alert("Failed to update feedback reply");
      }
    } else {
      const result = await addFeedback(currentFeedback);
      if (result) {
        handleClose();
      } else {
        alert("Failed to add feedback");
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
            Add Feedback
          </Button>
          {/* <div></div> */}
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
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Reply</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks?.map((feedback) => (
                <TableRow key={feedback._id}>
                  <TableCell>{feedback.name}</TableCell>
                  <TableCell>{feedback.email}</TableCell>
                  <TableCell>{feedback.rating}</TableCell>
                  <TableCell>
                    {new Date(feedback.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{feedback.comment}</TableCell>
                  <TableCell>{feedback.reply}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateOpen(feedback)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "red" }}
                      onClick={async () => {
                        if (
                          confirm(
                            "Are you sure you want to delete this feedback reply?"
                          )
                        ) {
                          if (await deleteFeedback(feedback._id)) {
                            alert("Feedback reply deleted successfully");
                          } else {
                            alert("Failed to delete feedback reply");
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
          <h2>{isUpdate ? "Update Feedback" : "Add Feedback"}</h2>
          <TextField
            label="Name"
            name="name"
            value={currentFeedback.name}
            onChange={handleChange}
            fullWidth
            disabled={isUpdate}
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={currentFeedback.email}
            onChange={handleChange}
            fullWidth
            disabled={isUpdate}
            margin="normal"
          />
          <TextField
            label="Rating"
            name="rating"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            value={currentFeedback.rating}
            onChange={handleChange}
            fullWidth
            disabled={isUpdate}
            margin="normal"
          />
          <InputLabel htmlFor="comment">Comment</InputLabel>
          <TextareaAutosize
            // label="Comment"
            name="comment"
            value={currentFeedback.comment}
            disabled={isUpdate}
            onChange={(e) =>
              setCurrentFeedback({
                ...currentFeedback,
                comment: e.target.value,
              })
            }
            minRows={5}
            style={{ width: "100%", border: "1px solid #ccc", padding: 10 }}
            // fullWidth
            // margin="normal"
          />
          <TextField
            label="Reply"
            name="reply"
            value={currentFeedback.reply}
            onChange={(e) =>
              setCurrentFeedback({
                ...currentFeedback,
                reply: e.target.value,
              })
            }
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

export default FeedbackScreen;
