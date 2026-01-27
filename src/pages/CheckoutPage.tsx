// src/pages/CheckoutPage.tsx
import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Paper,
  TextField,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import {
  Add,
  Remove,
  Delete,
  Close,
  Download,
  ContentCopy,
} from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import FreeShippingInfo from "../components/FreeShippingInfo";

import html2canvas from "html2canvas";
import GCashQR from "/payments/Gcash.jpg";
import BPIQR from "/payments/BPI.jpg";

/* =======================
   Validation + Storage
======================= */
const EMAIL_KEY = "checkout_email";
const PHONE_KEY = "checkout_phone";
const STREET_KEY = "checkout_street";
const CITY_KEY = "checkout_city";
const PROVINCE_KEY = "checkout_province";
const ZIP_KEY = "checkout_zip";
const NOTE_KEY = "checkout_note";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidPHPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return (
    (digits.length === 11 && digits.startsWith("09")) ||
    (digits.length === 12 && digits.startsWith("639"))
  );
};
const generateOrderRef = () => `ORD-${Date.now().toString().slice(-6)}`;

export default function CheckoutPage() {
  const { items, total, updateQuantity, removeItem } = useCart();

  const [email, setEmail] = useState(
    () => sessionStorage.getItem(EMAIL_KEY) || "",
  );
  const [phone, setPhone] = useState(
    () => sessionStorage.getItem(PHONE_KEY) || "",
  );
  const [street, setStreet] = useState(
    () => sessionStorage.getItem(STREET_KEY) || "",
  );
  const [city, setCity] = useState(
    () => sessionStorage.getItem(CITY_KEY) || "",
  );
  const [province, setProvince] = useState(
    () => sessionStorage.getItem(PROVINCE_KEY) || "",
  );
  const [zip, setZip] = useState(() => sessionStorage.getItem(ZIP_KEY) || "");
  const [note, setNote] = useState(
    () => sessionStorage.getItem(NOTE_KEY) || "",
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQR, setSelectedQR] = useState<"gcash" | "bpi" | null>(null);
  const [orderRef, setOrderRef] = useState("");

  const orderRefRef = useRef<HTMLDivElement>(null);

  /* =====================
     Handlers
  ===================== */
  const handleChange = (key: string, value: string) => {
    switch (key) {
      case "email":
        setEmail(value);
        sessionStorage.setItem(EMAIL_KEY, value);
        break;
      case "phone":
        setPhone(value);
        sessionStorage.setItem(PHONE_KEY, value);
        break;
      case "street":
        setStreet(value);
        sessionStorage.setItem(STREET_KEY, value);
        break;
      case "city":
        setCity(value);
        sessionStorage.setItem(CITY_KEY, value);
        break;
      case "province":
        setProvince(value);
        sessionStorage.setItem(PROVINCE_KEY, value);
        break;
      case "zip":
        setZip(value);
        sessionStorage.setItem(ZIP_KEY, value);
        break;
      case "note":
        setNote(value);
        sessionStorage.setItem(NOTE_KEY, value);
        break;
    }
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const clearFields = () => {
    setEmail("");
    setPhone("");
    setStreet("");
    setCity("");
    setProvince("");
    setZip("");
    setNote("");
    sessionStorage.removeItem(EMAIL_KEY);
    sessionStorage.removeItem(PHONE_KEY);
    sessionStorage.removeItem(STREET_KEY);
    sessionStorage.removeItem(CITY_KEY);
    sessionStorage.removeItem(PROVINCE_KEY);
    sessionStorage.removeItem(ZIP_KEY);
    sessionStorage.removeItem(NOTE_KEY);
  };

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!emailRegex.test(email)) errs.email = "Invalid email";
    if (!isValidPHPhone(phone)) errs.phone = "Invalid PH phone";
    if (!street.trim()) errs.street = "Required";
    if (!city.trim()) errs.city = "Required";
    if (!province.trim()) errs.province = "Required";
    if (!zip.trim()) errs.zip = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;
    const ref = generateOrderRef();
    setOrderRef(ref);
    setModalOpen(true);
    setSelectedQR(null);
  };

  const buildOrderText = () => {
    const itemLines = items
      .map((i) => `- ${i.name} x${i.quantity} = ₱${i.price * i.quantity}`)
      .join("\n");
    return `
Order Reference: ${orderRef}
Email: ${email}
Phone: ${phone}
Address: ${street}, ${city}, ${province}, ${zip}
Notes: ${note || "N/A"}

Items:
${itemLines}

Total: ₱${total}

Instructions:
1. Download or copy the order details.
2. Pay the total amount using available payment options (GCash / BPI).
3. Send both the order details and your payment screenshot to:
   - 09294413362 (SMS/Viber/WhatsApp)
   - @rhccrea on Instagram / TikTok
   - creatruction@gmail.com
4. You will receive a reply for confirmation.
`;
  };

  const copyOrder = () => {
    navigator.clipboard.writeText(buildOrderText());
    alert("Order details copied! Paste in SMS/DM to send.");
  };

  const downloadOrderImage = async () => {
    if (!orderRefRef.current) return;
    const canvas = await html2canvas(orderRefRef.current, {
      backgroundColor: "#1a1a1a",
    });
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `order-${orderRef}.png`;
    a.click();
  };

  const isFormValid =
    emailRegex.test(email) &&
    isValidPHPhone(phone) &&
    street.trim() !== "" &&
    city.trim() !== "" &&
    province.trim() !== "" &&
    zip.trim() !== "" &&
    items.length > 0;

  /* =====================
     Render
  ===================== */
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0e0e0e", color: "#fff", py: 8 }}>
      <Container maxWidth="sm">
        {/* HEADER */}
        <Box textAlign="center" mb={5}>
          <Typography variant="h4" fontWeight="bold">
            Checkout
          </Typography>
          <Typography sx={{ opacity: 0.8 }}>
            Complete your delivery info and confirm order
          </Typography>
        </Box>

        {/* CUSTOMER INFO */}
        <Paper sx={{ bgcolor: "#1a1a1a", p: 4, mb: 4, position: "relative" }}>
          <Typography fontWeight="bold" mb={2}>
            Customer Info
          </Typography>
          <Button
            size="small"
            variant="outlined"
            sx={{ position: "absolute", top: 16, right: 16 }}
            onClick={clearFields}
          >
            CLEAR
          </Button>

          <TextField
            label="Email"
            fullWidth
            variant="filled"
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Phone"
            fullWidth
            variant="filled"
            sx={{ mb: 2 }}
            value={phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone || "09XXXXXXXXX"}
          />

          <TextField
            label="Street"
            fullWidth
            variant="filled"
            sx={{ mb: 2 }}
            value={street}
            onChange={(e) => handleChange("street", e.target.value)}
            error={!!errors.street}
            helperText={errors.street}
          />

          <TextField
            label="City / Municipality"
            fullWidth
            variant="filled"
            sx={{ mb: 2 }}
            value={city}
            onChange={(e) => handleChange("city", e.target.value)}
            error={!!errors.city}
            helperText={errors.city}
          />

          <TextField
            label="Province"
            fullWidth
            variant="filled"
            sx={{ mb: 2 }}
            value={province}
            onChange={(e) => handleChange("province", e.target.value)}
            error={!!errors.province}
            helperText={errors.province}
          />

          <TextField
            label="Zip Code"
            fullWidth
            variant="filled"
            sx={{ mb: 2 }}
            value={zip}
            onChange={(e) => handleChange("zip", e.target.value)}
            error={!!errors.zip}
            helperText={errors.zip}
          />

          <TextField
            label="Order Notes (optional)"
            fullWidth
            variant="filled"
            multiline
            minRows={2}
            value={note}
            onChange={(e) => handleChange("note", e.target.value)}
          />
        </Paper>

        {/* ORDER SUMMARY */}
        <Paper sx={{ bgcolor: "#1a1a1a", p: 4, mb: 4 }}>
          <Typography fontWeight="bold" mb={2}>
            Order Summary
          </Typography>
          {items.map((i) => (
            <Box
              key={i.id}
              display="flex"
              justifyContent="space-between"
              mb={1}
            >
              <Typography>
                {i.name} × {i.quantity}
              </Typography>
              <Typography>₱{i.price * i.quantity}</Typography>
            </Box>
          ))}
          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="bold">Total</Typography>
            <Typography fontWeight="bold">₱{total}</Typography>
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.6, mt: 1 }}>
            <FreeShippingInfo /> included
          </Typography>
        </Paper>

        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{ py: 1.6, fontSize: "1rem", borderRadius: 2, mb: 3 }}
          onClick={handlePlaceOrder}
          disabled={!isFormValid}
        >
          Place Order
        </Button>
      </Container>

      {/* PAYMENT MODAL */}
      <Dialog open={modalOpen} fullWidth maxWidth="sm">
        <DialogTitle>
          Order Reference: {orderRef}
          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            ref={orderRefRef}
            sx={{ p: 2, bgcolor: "#1a1a1a", color: "#fff" }}
          >
            <Typography variant="h6" mb={1}>
              Order Details
            </Typography>
            <Typography>Email: {email}</Typography>
            <Typography>Phone: {phone}</Typography>
            <Typography>
              Address: {street}, {city}, {province}, {zip}
            </Typography>
            <Typography>Notes: {note || "N/A"}</Typography>
            <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.3)" }} />
            <Typography variant="subtitle1">Items:</Typography>
            {items.map((i) => (
              <Typography key={i.id}>
                - {i.name} × {i.quantity} = ₱{i.price * i.quantity}
              </Typography>
            ))}
            <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.3)" }} />
            <Typography fontWeight="bold">Total: ₱{total}</Typography>
            <Box mt={2}>
              <Typography fontWeight="bold">Instructions:</Typography>
              <Typography>1. Download or copy the order details.</Typography>
              <Typography>
                2. Pay the total amount using available payment options (GCash /
                BPI).
              </Typography>
              <Typography>
                3. Send both the order details and your payment screenshot to:
              </Typography>
              <Typography>- 09294413362 (SMS/Viber/WhatsApp)</Typography>
              <Typography>- @rhccrea on Instagram / TikTok</Typography>
              <Typography>- creatruction@gmail.com</Typography>
              <Typography>
                4. You will receive a reply for confirmation.
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={2} my={2}>
            <Button
              startIcon={<Download />}
              onClick={downloadOrderImage}
              fullWidth
            >
              Download Order Image
            </Button>
            <Button startIcon={<ContentCopy />} onClick={copyOrder} fullWidth>
              Copy Order Details
            </Button>
          </Stack>

          <Stack direction="row" spacing={2} mb={2}>
            <Button
              variant={selectedQR === "gcash" ? "contained" : "outlined"}
              onClick={() => setSelectedQR("gcash")}
              fullWidth
            >
              GCash
            </Button>
            <Button
              variant={selectedQR === "bpi" ? "contained" : "outlined"}
              onClick={() => setSelectedQR("bpi")}
              fullWidth
            >
              BPI
            </Button>
          </Stack>

          {selectedQR && (
            <Box textAlign="center">
              <img
                src={selectedQR === "gcash" ? GCashQR : BPIQR}
                alt="QR"
                style={{ maxWidth: "100%" }}
              />
              <Typography mt={2} sx={{ opacity: 0.7 }}>
                Use reference: <b>{orderRef}</b>
              </Typography>
            </Box>
          )}

          {/* PSYCHOLOGICAL REINFORCEMENT */}
          <Typography
            variant="body2"
            color="grey.500"
            mt={4}
            fontStyle="italic"
            textAlign="center"
            width="100%"
          >
            You're making a thoughtful choice—your order is carefully noted, and
            her special moment will be delivered with care.
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
