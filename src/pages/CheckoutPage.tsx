import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import { useLocation } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();

  // Expect product info passed via navigation state
  const product = location.state?.product || {
    name: "Thoughtful",
    price: 549,
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0e0e0e",
        color: "#fff",
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        {/* HEADER */}
        <Box textAlign="center" mb={5}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Almost There
          </Typography>
          <Typography sx={{ opacity: 0.8 }}>
            You’re about to give something that feels thoughtful — and that
            matters.
          </Typography>
        </Box>

        {/* ORDER SUMMARY */}
        <Paper
          elevation={0}
          sx={{
            bgcolor: "#1a1a1a",
            borderRadius: 3,
            p: 4,
            mb: 4,
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Order Summary
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1.5,
            }}
          >
            <Typography>{product.name} Tier</Typography>
            <Typography>₱{product.price}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1.5,
            }}
          >
            <Typography sx={{ opacity: 0.8 }}>Shipping</Typography>
            <Typography sx={{ opacity: 0.8 }}>Free</Typography>
          </Box>

          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontWeight="bold">Total</Typography>
            <Typography fontWeight="bold">₱{product.price}</Typography>
          </Box>

          <Typography variant="body2" sx={{ opacity: 0.6, mt: 1 }}>
            Free shipping included
          </Typography>
        </Paper>

        {/* CTA */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            py: 1.6,
            fontSize: "1rem",
            borderRadius: 2,
            mb: 3,
          }}
        >
          Proceed to Payment
        </Button>

        {/* PSYCHOLOGICAL REINFORCEMENT */}
        <Box textAlign="center">
          <Typography
            variant="body2"
            sx={{ opacity: 0.7, fontStyle: "italic" }}
          >
            Join hundreds of happy Valentines who chose to make the moment
            special.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
