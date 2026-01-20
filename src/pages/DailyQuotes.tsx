import React from "react";
import { Box, Card, Typography } from "@mui/material";

const quotes = [
  "Some people enter your life softly and still change the air around you.",
  "I don’t miss you loudly. I carry you carefully.",
  "Love doesn’t always arrive as a feeling. Sometimes it arrives as calm.",
  "You feel like a place I don’t rush away from.",
  "There are names the heart learns before the mind agrees.",
  "Nothing about this needs to be explained to feel real.",
  "I think connection is just attention that learned how to stay.",
  "You make ordinary moments feel like they’re allowed to matter.",
  "Some people feel familiar before you know why.",
  "This isn’t longing. It’s recognition.",
  "You exist in my life without effort. That’s rare.",
  "Love doesn’t always reach out. Sometimes it stands nearby.",
  "There are feelings that don’t ask for proof.",
  "You’re not a thought I chase. You’re one that returns.",
  "Some bonds don’t tighten. They settle.",
  "It’s strange how comfort can feel this meaningful.",
  "You feel like someone I could be quiet with.",
  "Not everything precious needs intensity.",
  "I don’t need moments with you to be perfect. Just honest.",
  "Some people don’t interrupt your life. They fit into it.",
  "There’s a difference between wanting and choosing.",
  "You’re the kind of thought that doesn’t rush past.",
  "Love doesn’t always feel like fire. Sometimes it feels like warmth that stays.",
  "You make presence feel effortless.",
  "I don’t think about you constantly. I think about you clearly.",
  "Some feelings don’t demand space. They already belong.",
  "You don’t overwhelm my life. You steady it.",
  "There’s care in the way some thoughts return gently.",
  "You feel like someone I’d recognize in any version of my life.",
  "This isn’t about forever. It’s about sincerity.",
  "You don’t feel like a chapter. You feel like a tone.",
  "I trust the quiet parts of this.",
  "Some connections don’t sparkle. They endure.",
  "You feel like something I don’t have to prove.",
  "I don’t hold onto you tightly. I hold onto you honestly.",
  "Love doesn’t always move forward. Sometimes it deepens.",
  "You feel like home without the walls.",
  "There’s peace in knowing someone is real.",
  "You don’t feel temporary.",
  "Some feelings don’t fade. They settle into place.",
  "I don’t wonder where this goes. I value where it is.",
  "You feel like a constant, not a question.",
  "There’s meaning in how easily you come to mind.",
  "You don’t distract me from life. You align with it.",
  "Some people feel like answers you weren’t asking for.",
  "I don’t romanticize you. I appreciate you.",
  "You feel like someone I’d protect gently.",
  "Love doesn’t always announce itself. Sometimes it stays.",
  "You don’t make my heart race. You make it steady.",
  "There’s intention in choosing softness.",
  "You feel like something worth tending, not chasing.",
  "Some bonds don’t need names to exist.",
  "You don’t feel like a moment. You feel like continuity.",
  "I don’t need this to be loud to know it matters.",
  "You feel like something real in a world that often isn’t.",
  "There’s care in the way you exist in my thoughts.",
  "You don’t belong to me. You matter to me.",
];

const START_DATE = new Date("2026-02-01T00:00:00Z");

function getTodayQuote() {
  const today = new Date();
  const utcToday = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  );
  const utcStart = Date.UTC(
    START_DATE.getUTCFullYear(),
    START_DATE.getUTCMonth(),
    START_DATE.getUTCDate()
  );
  const daysSinceStart = Math.floor(
    (utcToday - utcStart) / (1000 * 60 * 60 * 24)
  );
  const index = Math.min(Math.max(daysSinceStart, 0), quotes.length - 1);
  return quotes[index];
}

export default function DailyQuotes() {
  const quote = getTodayQuote();

  return (
    <Box
      sx={{
        background:
          "radial-gradient(circle at top, #fffdfb 0%, #f6efea 45%, #efe5df 100%)",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontFamily: '"Playfair Display", serif',
          textAlign: "center",
          mb: 2,
          color: "#3a2f2a",
        }}
      >
        Your Daily Quote
      </Typography>

      {/* Note */}
      <Typography
        variant="subtitle1"
        sx={{
          textAlign: "center",
          mb: 4,
          color: "#5a4f48",
          fontStyle: "italic",
        }}
      >
        A gentle thought that changes every day
      </Typography>

      <Card
        elevation={0}
        sx={{
          padding: { xs: 3, sm: 5 },
          maxWidth: 600,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: "16px",
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Typography
          sx={{
            fontFamily:
              '"Playfair Display", "Cormorant Garamond", "Libre Baskerville", serif',
            fontSize: { xs: "1.3rem", sm: "1.5rem" },
            lineHeight: 1.8,
            textAlign: "center",
            color: "#3a2f2a",
            letterSpacing: "0.01em",
          }}
        >
          {quote}
        </Typography>
      </Card>
    </Box>
  );
}
