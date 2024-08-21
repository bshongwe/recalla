"use client";
import { useState } from "react";
import FlashcardsPage from "../components/FlashcardsPage";
import { Button, Typography, TextField, Container, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1A73E8", // Google Gemini blue
    },
    background: {
      default: "#F5F5F5", // Light gray background
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    button: {
      textTransform: "none",
    },
    h1: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "20px",
          backgroundColor: "#FFFFFF",
        },
      },
    },
  },
});

export default function Home() {
  const [showcards, setShowcards] = useState(false);
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [topic, setTopic] = useState(""); 

  const clickbutton = async () => {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });
    const data = await response.json(); 
    setFlashcardsData(data); 
    setShowcards(true); 
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" >
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
        >
          
          <Typography variant="h4" color="primary" gutterBottom>
            Generate AI Flashcards
          </Typography>
          <TextField
            label="Enter Topic"
            variant="outlined"
            fullWidth
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={clickbutton}>
            <Typography>Get Flashcards</Typography>
          </Button>
          
          {showcards && (
            <Box mt={4}>
              <FlashcardsPage flashcards={flashcardsData} />
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
