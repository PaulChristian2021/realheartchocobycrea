import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isQuotes = location.pathname === "/quote";

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: isQuotes
          ? "radial-gradient(circle at top, #fffdfb 0%, #f6efea 45%, #efe5df 100%)"
          : "transparent",
        color: isQuotes ? "#000" : "#fff",
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
          textAlign: { xs: "center", sm: "left" }, // center text on mobile
        }}
      >
        {/* Logo / Brand */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1rem", sm: "1.25rem" },
            width: { xs: "100%", sm: "auto" }, // full width on mobile
            mb: { xs: 1, sm: 0 }, // spacing if wrapped
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
              justifyContent: "center", // center icons on mobile
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
              justifyContent: { xs: "center", sm: "flex-end" }, // center buttons on mobile
              gap: { xs: 1, sm: 2 },
              width: { xs: "100%", sm: "auto" },
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
              to="/shop"
              color="inherit"
              sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
            >
              Shop
            </Button>
            <Button
              component={Link}
              to="/faq"
              color="inherit"
              sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
            >
              FAQ
            </Button>
            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              sx={{
                mt: { xs: 1, sm: 0 },
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "#e05555",
                  transform: "scale(1.05)",
                },
              }}
            >
              Checkout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
