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
import FreeShippingInfo from "../components/FreeShippingInfo";

/* =======================
   Validation + Storage
======================= */
const EMAIL_KEY = "checkout_email";
const PHONE_KEY = "checkout_phone";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidPHPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return (
    (digits.length === 11 && digits.startsWith("09")) ||
    (digits.length === 12 && digits.startsWith("639"))
  );
};

export default function CheckoutPage() {
  const { items, total, updateQuantity, removeItem } = useCart();

  const [email, setEmail] = useState(
    () => sessionStorage.getItem(EMAIL_KEY) || "",
  );
  const [phone, setPhone] = useState(
    () => sessionStorage.getItem(PHONE_KEY) || "",
  );

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  /* =======================
     Handlers
  ======================= */
  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
      sessionStorage.removeItem(EMAIL_KEY);
    } else {
      setEmailError("");
      sessionStorage.setItem(EMAIL_KEY, value);
    }
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);

    if (!isValidPHPhone(value)) {
      setPhoneError("Enter a valid PH number (09XXXXXXXXX)");
      sessionStorage.removeItem(PHONE_KEY);
    } else {
      setPhoneError("");
      sessionStorage.setItem(PHONE_KEY, value);
    }
  };

  const handlePayment = () => {
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!isValidPHPhone(phone)) {
      setPhoneError("Please enter a valid Philippine phone number");
      return;
    }

    alert(
      `Order confirmed!\nEmail: ${email}\nPhone: ${phone}\nTotal: ₱${total}`,
    );
  };

  const isFormValid =
    emailRegex.test(email) && isValidPHPhone(phone) && items.length > 0;

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
            onChange={(e) => handleEmailChange(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Phone Number"
            variant="filled"
            fullWidth
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            error={!!phoneError}
            helperText={phoneError || "Format: 09XXXXXXXXX"}
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
                  alignItems: "center",
                  mb: 2,
                  flexWrap: "wrap",
                }}
              >
                {/* Item Info */}
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
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

                {/* Item Total */}
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
            <FreeShippingInfo /> included
          </Typography>
        </Paper>

        {/* CTA */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{ py: 1.6, fontSize: "1rem", borderRadius: 2, mb: 3 }}
          onClick={handlePayment}
          disabled={!isFormValid}
        >
          Place Order
        </Button>

        {/* PSYCHOLOGICAL REINFORCEMENT */}
        <Box textAlign="center">
          <Typography
            variant="body2"
            sx={{ opacity: 0.7, fontStyle: "italic" }}
          >
            Moments like these don’t happen every day—thank you for making it
            special.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
