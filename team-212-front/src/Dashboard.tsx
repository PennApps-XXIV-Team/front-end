import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { getDatabase, ref, get, remove } from "firebase/database";
import auth from "./auth";
import AddCard from "./AddCard";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface Transaction {
  timestamp: string;
}

interface TransactionLogProps {
  transactions: Transaction[];
}

const Dashboard: React.FC<TransactionLogProps> = () => {
  const [cards, setCards] = useState<{ id: string; cardNumber: string }[]>([]);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [isCardFormOpen, setIsCardFormOpen] = useState(false);

  const navigate = useNavigate();

  const fetchTransactionsForCard = async (cardNumber: string) => {
    try {
      const response = await fetch(
        "https://us-east1-stalwart-realm-339201.cloudfunctions.net/get_transactions-1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cardnumber: cardNumber }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      if (data.transactions) {
        setAllTransactions((prev) => [...prev, ...data.transactions]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchCards = async () => {
    const db = getDatabase();
    const cardNumbersRef = ref(
      db,
      "users/" + auth.currentUser?.uid + "/cardNumbers"
    );
    const snapshot = await get(cardNumbersRef);
    if (snapshot.exists()) {
      const cardList = Object.entries(snapshot.val()).map(
        ([id, cardNumber]) => ({
          id,
          cardNumber: cardNumber as string,
        })
      );
      setCards(cardList);
      cardList.forEach((card) => fetchTransactionsForCard(card.cardNumber));
    }
    setLastRefreshed(new Date());
  };

  useEffect(() => {
    fetchCards();

    // Refresh data every 30 seconds
    const intervalId = setInterval(fetchCards, 10000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleOpenCardForm = () => {
    setIsCardFormOpen(true);
  };

  const handleCloseCardForm = () => {
    setIsCardFormOpen(false);
    fetchCards(); // Refetch the cards after closing the modal to ensure updated data
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleRemoveCard = async (id: string) => {
    try {
      const db = getDatabase();
      const cardRef = ref(
        db,
        "users/" + auth.currentUser?.uid + "/cardNumbers/" + id
      );
      await remove(cardRef);
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    } catch (error) {
      console.error("Error removing card:", error);
    }
  };

  return (
    <Paper elevation={3} style={{ margin: "20px", padding: "20px" }}>
      <Typography variant="h5">Transaction Log</Typography>
      <Typography variant="subtitle2">
        Last refreshed: {lastRefreshed?.toLocaleTimeString()}
      </Typography>
      <List>
        {allTransactions.map((transaction) => (
          <ListItem key={transaction.timestamp}>
            <ListItemText
              primary={`${transaction.timestamp}`}
              secondary={`${transaction.timestamp}`}
            />
          </ListItem>
        ))}
        {cards.map((card) => (
          <ListItem key={card.id}>
            <ListItemText
              primary={`Card: **** **** **** ${card.cardNumber.slice(-4)}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleRemoveCard(card.id)}>
                X
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Button variant="contained" color="primary" onClick={handleOpenCardForm}>
        Add Card
      </Button>
      <Button variant="contained" color="secondary" onClick={handleSignOut}>
        Sign Out
      </Button>
      <Modal
        open={isCardFormOpen}
        onClose={handleCloseCardForm}
        aria-labelledby="add-card-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <AddCard onCardAdded={handleCloseCardForm} />
        </Box>
      </Modal>
    </Paper>
  );
};

export default Dashboard;
