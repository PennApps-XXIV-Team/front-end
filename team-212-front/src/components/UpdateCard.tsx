import { Button, TextField, List, ListItem, ListItemText } from "@mui/material";
import { getDatabase, ref, push, get, remove } from "firebase/database";
import auth from "../auth";
import { useState, useEffect } from "react";

const UpdateCardButton: React.FC = () => {
  const [newCardNumber, setNewCardNumber] = useState<string>("");
  const [cards, setCards] = useState<string[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      const db = getDatabase();
      const cardNumbersRef = ref(db, "users/" + auth.currentUser?.uid + "/cardNumbers");
      const snapshot = await get(cardNumbersRef);
      if (snapshot.exists()) {
        const cardList: string[] = Object.values(snapshot.val());
        setCards(cardList);
      }
    };
    fetchCards();
  }, []);

  const handleUpdateCard = async () => {
    try {
      const db = getDatabase();
      const cardNumbersRef = ref(db, "users/" + auth.currentUser?.uid + "/cardNumbers");
      await push(cardNumbersRef, newCardNumber);
      console.log("Card number updated successfully");
      setNewCardNumber(""); // Clear the input
      setCards([...cards, newCardNumber]);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleRemoveCard = async (card: string) => {
    try {
      const db = getDatabase();
      const cardRef = ref(db, "users/" + auth.currentUser?.uid + "/cardNumbers/" + card);
      await remove(cardRef);
      setCards(cards.filter(c => c !== card));
    } catch (error) {
      console.error("Error removing card:", error);
    }
  };

  return (
    <div>
      <TextField 
        value={newCardNumber}
        onChange={(e) => setNewCardNumber(e.target.value)}
        placeholder="New Card Number"
      />
      <Button onClick={handleUpdateCard}>Add Card</Button>
      <List>
        {cards.map(card => (
          <ListItem key={card}>
            <ListItemText primary={`**** **** **** ${card.slice(-4)}`} />
            <Button onClick={() => handleRemoveCard(card)}>Remove</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UpdateCardButton;
