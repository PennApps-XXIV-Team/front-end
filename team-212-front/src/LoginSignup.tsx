import React, { useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Container,
  Divider,
  Box,
  Grid
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "./auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const LoginSignup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in successfully");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signed up successfully");
      }
      navigate("/");
    } catch (error: unknown) {
      console.error(
        "Unknown error occurred with Firebase authentication: ",
        error
      );
    }
  };

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
            <Container component="main" maxWidth="xs">
              <Paper
                elevation={3}
                style={{ padding: "20px", marginTop: "20px" }}
              >
                <Typography variant="h5">
                  {isLoginMode ? "Login" : "Sign Up"}
                </Typography>
                <form onSubmit={handleAuth}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px" }}
                  >
                    {isLoginMode ? "Login" : "Register"}
                  </Button>
                </form>
                <Divider style={{ margin: "20px 0" }} />
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsLoginMode((prevMode) => !prevMode)}
                >
                  {isLoginMode
                    ? "Create an account"
                    : "Already have an account?"}
                </Button>
              </Paper>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginSignup;
