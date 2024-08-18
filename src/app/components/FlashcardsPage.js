"use client";
import React, { useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const FlashcardsPage = ({ flashcards }) => {
  if (!Array.isArray(flashcards)) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="textSecondary">
          No flashcards available
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      py={4}
      px={2}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        AI-Generated Flashcards
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Flashcard front={flashcard.front} back={flashcard.back} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const Flashcard = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <Paper
      onClick={() => setFlipped(!flipped)}
      elevation={3}
      sx={{
        p: 3,
        height: "250px", // Increased height for more text
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
        position: "relative",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backfaceVisibility: "hidden",
          transition: "opacity 0.5s ease",
          opacity: flipped ? 0 : 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "normal", // Allow text to wrap
        }}
      >
        <Typography
          variant="body1"
          color="textPrimary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 5, // Limit to 5 lines
            lineHeight: "1.5",
          }}
        >
          {front}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backfaceVisibility: "hidden",
          transition: "opacity 0.5s ease",
          opacity: flipped ? 1 : 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "normal",
    
        }}
      >
        <Typography
          variant="body1"
          color="textPrimary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 5, // Limit to 5 lines
            lineHeight: "1.5",
          }}
        >
          {back}
        </Typography>
      </Box>
    </Paper>
  );
};

export default FlashcardsPage;
