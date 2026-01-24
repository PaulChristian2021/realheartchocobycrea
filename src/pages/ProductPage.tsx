// src/pages/ProductPage.tsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { Add, Remove } from "@mui/icons-material";
import FreeShippingInfo from "../components/FreeShippingInfo";

const tiers = [
  {
    id: "thoughtful",
    name: "Thoughtful",
    description:
      "A carefully crafted chocolate tier designed to delight and create a memorable experience.",
    price: 549,
    image: "/tiers/p_thoughtful.png",
  },
  {
    id: "deluxe",
    name: "Deluxe",
    description:
      "An elevated chocolate tier for a richer, more indulgent experience that feels truly special.",
    price: 649,
    image: "/tiers/p_deluxe.jpg",
  },
];

export default function ProductPage() {
  const { addItem } = useCart();

  // Track quantity per product
  const [quantities, setQuantities] = useState(
    tiers.reduce((acc, tier) => ({ ...acc, [tier.id]: 1 }), {})
  );

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities((prev) => {
      const newQty = prev[id] + delta;
      return { ...prev, [id]: newQty > 0 ? newQty : 1 };
    });
  };

  const handleAddToCart = (product: (typeof tiers)[number]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantities[product.id],
    });
    alert(`${quantities[product.id]} x ${product.name} added to cart!`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "background.default",
        color: "text.primary",
        py: 8,
        pb: 10,
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Choose Your Chocolate Tier
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.85 }}>
            Simple, premium, and made to impress. Pick the one that suits your
            Valentine.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {tiers.map((product) => (
            <Card
              key={product.id}
              sx={{
                width: { xs: "100%", sm: "45%", md: "30%" },
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="220"
                image={product.image}
                alt={product.name}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {product.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                  {product.description}
                </Typography>

                <Typography variant="subtitle1" fontWeight="medium" mb={1}>
                  ₱{product.price}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary" mb={3}>
                  <FreeShippingInfo /> nationwide
                </Typography>

                {/* Quantity Selector */}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={2}
                  gap={1}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(product.id, -1)}
                  >
                    <Remove />
                  </IconButton>

                  <TextField
                    value={quantities[product.id]}
                    size="small"
                    inputProps={{
                      style: { textAlign: "center" },
                      readOnly: true,
                    }}
                    sx={{ width: 50 }}
                  />

                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(product.id, 1)}
                  >
                    <Add />
                  </IconButton>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}

          <Typography
            variant="body2"
            color="grey.500"
            mt={4}
            fontStyle="italic"
            textAlign="center"
            width="100%"
          >
            Join hundreds of happy Valentines who chose to make the moment
            special.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
