import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext";

export default function Header() {
  const location = useLocation();
  const isQuotes = location.pathname === "/";

  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="sticky"
      elevation={scrolled ? 4 : 0}
      sx={{
        top: 0,
        zIndex: 1300,
        background: isQuotes
          ? scrolled
            ? "rgba(255, 245, 230, 0.95)" // opaque when scrolling
            : "radial-gradient(circle at top, #fffdfb 0%, #f6efea 45%, #efe5df 100%)"
          : scrolled
            ? "rgba(14, 14, 14, 0.95)" // solid dark when scrolling
            : "transparent", // transparent at top
        color: isQuotes ? "#000" : "#fff",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
        px: { xs: 2, sm: 4 },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1200px",
          mx: "auto",
          width: "100%",
          py: { xs: 1, sm: 2 },
          flexWrap: "wrap",
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        {/* Logo / Brand */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1rem", sm: "1.25rem" },
            width: { xs: "100%", sm: "auto" },
            mb: { xs: 1, sm: 0 },
          }}
        >
          Real Heart Choco by Crea
        </Typography>

        {/* Navigation / Actions */}
        {isQuotes ? (
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 2 },
              justifyContent: "center",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <IconButton
              component="a"
              href="https://www.instagram.com/rhccrea"
              target="_blank"
              sx={{
                p: 0,
                transition: "transform 0.2s, filter 0.2s",
                "&:hover": {
                  transform: "scale(1.1)",
                  filter: "brightness(1.2)",
                },
              }}
            >
              <Box
                component="img"
                src="/ig.png"
                alt="Instagram"
                sx={{ width: 28, height: 28 }}
              />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.tiktok.com/@rhccrea"
              target="_blank"
              sx={{
                p: 0,
                transition: "transform 0.2s, filter 0.2s",
                "&:hover": {
                  transform: "scale(1.1)",
                  filter: "brightness(1.2)",
                },
              }}
            >
              <Box
                component="img"
                src="/tiktok.png"
                alt="TikTok"
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: { xs: "center", sm: "flex-end" },
              gap: { xs: 1, sm: 2 },
              width: { xs: "100%", sm: "auto" },
              alignItems: "center",
            }}
          >
            <Button
              component={Link}
              to="/home"
              color="inherit"
              sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/tiers"
              color="inherit"
              sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
            >
              Tiers
            </Button>
            <Button
              component={Link}
              to="/faq"
              color="inherit"
              sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
            >
              FAQ
            </Button>

            {/* Cart Icon with Badge */}
            <IconButton
              component={Link}
              to="/cart"
              color="inherit"
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
