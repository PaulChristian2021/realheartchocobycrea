// src/pages/CheckoutPage.tsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { items, total, updateQuantity, removeItem } = useCart();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handlePayment = () => {
    if (!email || !phone) {
      alert("Please enter your email and phone number.");
      return;
    }
    alert(
      `Order confirmed!\nEmail: ${email}\nPhone: ${phone}\nTotal: ₱${total}`
    );
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
            Checkout
          </Typography>
          <Typography sx={{ opacity: 0.8 }}>
            Enter your details and confirm your order
          </Typography>
        </Box>

        {/* CUSTOMER INFO */}
        <Paper
          elevation={0}
          sx={{ bgcolor: "#1a1a1a", borderRadius: 3, p: 4, mb: 4 }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Customer Info
          </Typography>
          <TextField
            label="Email"
            variant="filled"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone Number"
            variant="filled"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Paper>

        {/* ORDER SUMMARY */}
        <Paper
          elevation={0}
          sx={{ bgcolor: "#1a1a1a", borderRadius: 3, p: 4, mb: 4 }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Order Summary
          </Typography>

          {items.length === 0 ? (
            <Typography>Your cart is empty.</Typography>
          ) : (
            items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center", // vertical alignment
                  mb: 2,
                  flexWrap: "wrap", // ensures responsiveness on mobile
                }}
              >
                {/* Item Name & Price per unit */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 120,
                  }}
                >
                  <Typography>{item.name}</Typography>
                  <Typography sx={{ opacity: 0.8, fontSize: "0.875rem" }}>
                    ₱{item.price} each
                  </Typography>
                </Box>

                {/* Quantity Controls */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Remove fontSize="small" />
                  </IconButton>

                  <Typography sx={{ width: 24, textAlign: "center" }}>
                    {item.quantity}
                  </Typography>

                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Add fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() => removeItem(item.id)}
                    color="error"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>

                {/* Total price for this item */}
                <Typography
                  sx={{ minWidth: 60, textAlign: "right", fontWeight: 500 }}
                >
                  ₱{item.price * item.quantity}
                </Typography>
              </Box>
            ))
          )}

          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontWeight="bold">Total</Typography>
            <Typography fontWeight="bold">₱{total}</Typography>
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
          sx={{ py: 1.6, fontSize: "1rem", borderRadius: 2, mb: 3 }}
          onClick={handlePayment}
          disabled={items.length === 0}
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
