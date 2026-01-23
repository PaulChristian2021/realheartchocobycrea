import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  List,
  ListItem,
} from "@mui/material";

/**
 * HERO BACKGROUND IMAGES
 * These should be inside /public
 * Example: /public/a.jpg, /public/b.jpg, etc.
 */
const heroImages = [
  "/a.jpg",
  "/b.jpg",
  "/c.jpg",
  "/d.jpg",
  "/e.jpg",
  "/f.jpg",
  "/g.jpg",
];

export default function Home() {
  // current image index
  const [index, setIndex] = useState(0);

  // previous image index (used for fading)
  const [prevIndex, setPrevIndex] = useState(0);

  // pre-load
  useEffect(() => {
    heroImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = `/homeBgImages/${src}`;
      document.head.appendChild(link);
    });

    return () => {
      heroImages.forEach((src) => {
        const href = `/homeBgImages/${src}`;
        document
          .querySelectorAll(`link[rel="preload"][href="${href}"]`)
          .forEach((el) => el.remove());
      });
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(index); // store current before changing
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // change every 6 seconds

    return () => clearInterval(interval);
  }, [index]);

  return (
    <Box
      sx={{
        minHeight: "100vh", // full viewport height
        width: "100%", // full width
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {/* ================= HERO SECTION ================= */}
      <Box
        id="changingImages"
        sx={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden", // hide fade overflow
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* PREVIOUS IMAGE (fades out) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)),
              url(homeBgImages/${heroImages[prevIndex]})
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0,
            transition: "opacity 1.2s ease-in-out",
          }}
        />

        {/* CURRENT IMAGE (fades in) */}
        <Box
          key={index} // forces re-render to trigger animation
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)),
              url(homeBgImages/${heroImages[index]})
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 1,
            transition: "opacity 1.2s ease-in-out",
          }}
        />

        {/* HERO CONTENT (always on top) */}
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
          {/* HERO COPY */}
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              Give her something she’ll remember — not just chocolate.
            </Typography>

            <Typography variant="h6" mb={4} sx={{ opacity: 0.9 }}>
              Valentine’s gifts are hard when you care.
              <br />
              We help you give a thoughtful experience without overthinking it.
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{ px: 5, py: 1.5 }}
              href="#shop"
            >
              Create Her Valentine Experience
            </Button>
          </Box>

          {/* BODY COPY + BACKSTORY */}
          <Box textAlign="center" mb={8}>
            <Typography variant="body1" sx={{ fontSize: "1.15rem" }}>
              You want her to feel special, not disappointed.
              <br />
              We’ve been there — wanting a gift that says everything you feel.
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontSize: "1.15rem", mt: 2, opacity: 0.85 }}
            >
              That’s why we created a layered Valentine’s experience:
              <br />
              hidden messages, personal cards, and small details meant to be
              noticed and remembered.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ================= HOW IT WORKS ================= */}
      <Container maxWidth="md">
        <Box textAlign="center" my={8}>
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

        {/* ================= FINAL CTA ================= */}
        <Box textAlign="center" mb={10}>
          <Typography variant="body1" sx={{ fontSize: "1.2rem", mb: 4 }}>
            She opens the box. Notices the details.
            <br />
            Smiles — because it feels personal.
          </Typography>

          <Button
            variant="contained"
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
