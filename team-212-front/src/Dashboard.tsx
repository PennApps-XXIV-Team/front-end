import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { getDatabase, ref, get } from "firebase/database";
import auth from "./auth";

interface Transaction {
  timestamp: string;
}

interface TransactionLogProps {
  transactions: Transaction[];
}

const Dashboard: React.FC<TransactionLogProps> = ({ transactions }) => {
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

  return (
    <Paper elevation={3} style={{ margin: '20px', padding: '20px' }}>
      <Typography variant="h5">Transaction Log</Typography>
      <List>
        {transactions.map(transaction => (
          <ListItem key={transaction.timestamp}>
            <ListItemText
              primary={`${transaction.timestamp}`}
              secondary={`${transaction.timestamp}`}
            />
          </ListItem>
        ))}
        {cards.map(card => (
          <ListItem key={card}>
            <ListItemText primary={`Card: **** **** **** ${card.slice(-4)}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default Dashboard;
