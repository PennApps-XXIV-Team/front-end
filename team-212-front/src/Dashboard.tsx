import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

interface Transaction {
  timestamp: string;
}

interface TransactionLogProps {
  transactions: Transaction[];
}

const Dashboard: React.FC<TransactionLogProps> = ({ transactions }) => {
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
      </List>
    </Paper>
  );
}

export default Dashboard;

