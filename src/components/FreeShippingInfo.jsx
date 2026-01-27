import React, { useState } from "react";
import { Box, Typography, Popover } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function FreeShippingInfo() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: "inline-flex",
          alignItems: "baseline", // 🔑 critical fix
          gap: 0.75,
          cursor: "pointer",
          userSelect: "none",
          color: "rgba(255, 255, 255, 0.86)",
          transition: "color 0.2s",
          "&:hover": { color: "rgba(255,255,255,0.9)" },
        }}
      >
        <InfoOutlinedIcon
          fontSize="inherit" // 🔑 inherit text size
          sx={{
            position: "relative",
            top: "0.1em", // micro optical alignment (font-dependent)
            opacity: 0.8,
          }}
        />

        <Typography
          variant="body2"
          component="span"
          sx={{
            lineHeight: 1.4,
          }}
        >
          Free shipping
        </Typography>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            p: 2,
            maxWidth: 260,
            bgcolor: "#1a1a1a",
            color: "#fff",
            borderRadius: 2,
            fontSize: "0.85rem",
          },
        }}
      >
        <Typography fontWeight={500} mb={0.5}>
          Estimated delivery
        </Typography>
        <Typography>• Manila: 1–2 days</Typography>
        <Typography>• Nearby provinces: 2–4 days</Typography>
        <Typography>• Nationwide: 4–7 days</Typography>
        <Typography
          variant="subtext"
          sx={{ display: "block", marginTop: "10px" }}
        >
          We ship as early as possible!
        </Typography>
      </Popover>
    </>
  );
}
