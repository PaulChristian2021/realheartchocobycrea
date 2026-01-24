import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import FreeShippingInfo from "../components/FreeShippingInfo";

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart();

  const handleQtyChange = (id: string, value: number) => {
    if (value <= 0) return removeItem(id);
    updateQuantity(id, value);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Your Cart
      </Typography>

      {items.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          {items.map((item) => (
            <Box
              key={item.id}
              sx={{
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                py: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Box>
                <Typography fontWeight="medium">{item.name}</Typography>
                <Typography color="text.secondary">
                  ₱{item.price} each • Free Shipping
                </Typography>
              </Box>

              {/* QUANTITY CONTROLS */}
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                mt={{ xs: 1, sm: 0 }}
              >
                <IconButton
                  onClick={() => handleQtyChange(item.id, item.quantity - 1)}
                >
                  <Remove />
                </IconButton>

                <TextField
                  value={item.quantity}
                  onChange={(e) =>
                    handleQtyChange(item.id, parseInt(e.target.value) || 1)
                  }
                  size="small"
                  inputProps={{ style: { width: 40, textAlign: "center" } }}
                />

                <IconButton
                  onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                >
                  <Add />
                </IconButton>

                <IconButton onClick={() => removeItem(item.id)}>
                  <Delete />
                </IconButton>
              </Box>

              {/* LINE TOTAL */}
              <Box mt={{ xs: 1, sm: 0 }}>
                <Typography fontWeight="bold">
                  ₱{item.price * item.quantity}
                </Typography>
              </Box>
            </Box>
          ))}

          {/* TOTAL */}
          <Box mt={4} textAlign="center">
            <Typography variant="h6">
              Total: <strong>₱{total}</strong>
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              <FreeShippingInfo /> • Secure checkout
            </Typography>

            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              size="large"
              sx={{ mt: 3, px: 6 }}
            >
              Continue to Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}
