import React, { useState } from "react";
import { Button, TextField, Paper, Typography, Container } from "@mui/material";
import { getDatabase, ref, push } from "firebase/database";
import auth from "./auth";

interface CardFormProps {
  onCardAdded: () => void;
}
const CardForm: React.FC<CardFormProps> = ({ onCardAdded }) => {
  const [cardNumber, setCardNumber] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const db = getDatabase();
      const cardNumbersRef = ref(
        db,
        "users/" + auth.currentUser?.uid + "/cardNumbers"
      );
      await push(cardNumbersRef, cardNumber); // Push cardNumber to the array
      console.log("Card number added successfully");
      setCardNumber(""); // Clear the input
      onCardAdded(); // Notify the App component that the card was added
    } catch (error : unknown) {
      console.error("Error: ", error);
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
