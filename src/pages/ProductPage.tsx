// src/pages/ProductPage.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";

// Chocolate tiers
const tiers = [
  {
    id: "thoughtful",
    name: "Thoughtful",
    description:
      "A carefully crafted chocolate tier designed to delight and create a memorable experience.",
    price: "₱549",
    image: "/tiers/p_thoughtful.png",
  },
  {
    id: "deluxe",
    name: "Deluxe",
    description:
      "An elevated chocolate tier for a richer, more indulgent experience that feels truly special.",
    price: "₱649",
    image: "/tiers/p_deluxe.jpg",
  },
];

export default function ProductPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "background.default",
        color: "text.primary",
        py: 8,
        paddingBottom: 10,
      }}
    >
      <Container maxWidth="lg">
        {/* PAGE HEADER */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Choose Your Chocolate Tier
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.85 }}>
            Simple, premium, and made to impress. Pick the one that suits your
            Valentine.
          </Typography>
        </Box>

        {/* PRODUCT LIST */}
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
              {/* Product Image */}
              <CardMedia
                component="img"
                height="220"
                image={product.image}
                alt={product.name}
              />

              {/* Product Content */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {product.description}
                </Typography>
                <Typography variant="subtitle1" fontWeight="medium" mb={2}>
                  {product.price}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" mb={2}>
                  Free shipping nationwide
                </Typography>
                <Link to="/checkout">
                  <Button variant="contained" color="primary" fullWidth>
                    Buy Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
          <Typography
            variant="body2"
            color="grey.500"
            mt={2}
            fontStyle="italic"
            paddingBottom={10}
          >
            Join hundreds of happy Valentines who chose to make the moment
            special.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
