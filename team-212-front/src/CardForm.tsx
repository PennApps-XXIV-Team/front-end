import React, { useState } from "react";
import { Button, TextField, Paper, Typography, Container } from "@mui/material";
import { getDatabase, ref, set } from "firebase/database";
import auth from "./auth";

const CardForm: React.FC = () => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const db = getDatabase();
      set(ref(db, "users/" + auth.currentUser?.providerId), {
        cardNumber: cardNumber,
      });
      console.log("Card number added successfully");
      setCardNumber(""); // Clear the input
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5">Add Credit Card</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Credit Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
          >
            Add Card
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CardForm;
