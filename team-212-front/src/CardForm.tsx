import React, {} from "react";
import {
  Box,
  Grid,
  TextField,
} from "@mui/material";
import Sidebar from "./Sidebar";
import AddCard from "./AddCard";

interface CardFormProps {
  onCardAdded: () => void;
}
const CardForm: React.FC<CardFormProps> = ({ onCardAdded }) => {
  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid
          item
          xs={4}
          justifyContent="center"
          alignItems="center"
          style={{ height: "100vh" }}
        >
          <Sidebar></Sidebar>
        </Grid>
        <Grid
          item
          xs={8}
          justifyContent="center"
          alignItems="center"
          style={{ height: "100vh" }}
        >
          <Box
            display="flex"
            height="100vh"
            justifyContent="center"
            alignItems="center"
            bgcolor="#fcfbfa"
          >
            <form onSubmit={ undefined}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Phone Number"
                    value={undefined}
                    onChange={() => undefined}
                  />
                </form>
            <AddCard onCardAdded={onCardAdded}></AddCard>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardForm;
