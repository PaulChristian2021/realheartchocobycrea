// src/pages/CheckoutPage.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Stack,
} from "@mui/material";

export default function CheckoutPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        py: 10,
      }}
    >
      <Container maxWidth="sm">
        {/* HEADER */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            You’re almost there
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.85 }}>
            You’ve chosen something thoughtful — now let’s make it official.
          </Typography>
        </Box>

        {/* ORDER SUMMARY */}
        <Box
          sx={{
            bgcolor: "rgba(255,255,255,0.05)",
            borderRadius: 2,
            p: 4,
            mb: 5,
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight="medium">
              Your Selection
            </Typography>

            <Typography variant="body1">Deluxe Chocolate Tier</Typography>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.15)" }} />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1">Total</Typography>
              <Typography variant="h6" fontWeight="bold">
                ₱599
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* PRIMARY CTA */}
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ py: 1.6, mb: 3 }}
          href="#payment" // replace later with real payment flow
        >
          Proceed to Payment
        </Button>

        {/* REASSURANCE */}
        <Typography
          variant="body2"
          align="center"
          sx={{ opacity: 0.7, fontStyle: "italic" }}
        >
          Join hundreds of happy Valentines who chose to make the moment
          special.
        </Typography>
      </Container>
    </Box>
  );
}
