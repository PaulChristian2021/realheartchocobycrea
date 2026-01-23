import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  List,
  ListItem,
} from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh", // full viewport height
        width: "100%", // full width
        bgcolor: "background.default", // uses your darkTheme background
        color: "text.primary",
        py: 10,
      }}
    >
      <Container maxWidth="md">
        {/* HERO SECTION */}
        <Box
          id={"changingImages"}
          sx={{
            backgroundColor: "#333",
          }}
        >
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              Give her something she’ll remember — not just chocolate.
            </Typography>
            <Typography variant="h6" mb={4}>
              Valentine’s gifts are hard when you care. <br />
              We help you give a thoughtful experience that shows effort —
              without overthinking it.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 5, py: 1.5 }}
              href="#shop"
            >
              Create Her Valentine Experience
            </Button>
          </Box>

          {/* BODY COPY + BACKSTORY */}
          <Box textAlign="center" mb={8}>
            <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
              You want her to feel special, not disappointed. <br />
              We’ve been there — wanting a gift that says everything you feel.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.2rem", mt: 2 }}>
              That’s why we created a layered Valentine’s experience: <br />
              hidden messages, personal cards, and small details meant to be
              noticed, shared, and remembered.
            </Typography>
          </Box>
        </Box>
        {/* HOW IT WORKS */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h5" fontWeight="medium" gutterBottom>
            Simple. Thoughtful. Done right.
          </Typography>
          <List
            sx={{
              display: "inline-block",
              textAlign: "left",
              padding: 0,
              "& .MuiListItem-root": { padding: "4px 0" },
            }}
          >
            <ListItem>1. Choose your Valentine experience</ListItem>
            <ListItem>2. Add your personal message</ListItem>
            <ListItem>3. Let the details do the talking</ListItem>
          </List>
        </Box>

        {/* FUTURE-PACING / CTA */}
        <Box textAlign="center">
          <Typography variant="body1" sx={{ fontSize: "1.2rem", mb: 4 }}>
            She opens the box. Notices the hidden details. Smiles — because it
            feels personal, intentional, thoughtful.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 5, py: 1.5 }}
            href="#shop"
          >
            Give her the right gift
          </Button>
          <Typography
            variant="body2"
            color="grey.500"
            mt={2}
            fontStyle="italic"
          >
            Because sometimes you feel a lot — and don’t know how to say it.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
