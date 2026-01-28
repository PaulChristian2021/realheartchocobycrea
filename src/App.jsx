import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { CartProvider } from "./context/CartContext";

import darkTheme from "./theme";
import Header from "./components/Header";
import Home from "./pages/Home";
import DailyQuotes from "./pages/DailyQuotes";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import CartPage from "./pages/CartPage";

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      {/* CssBaseline applies theme globally */}
      <CssBaseline />
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* Homepage (landing for ads) */}
            <Route path="/home" element={<Home />} />

            {/* QR quote page - will remain light/pink */}
            <Route path="/quote" element={<DailyQuotes />} />

            {/* Redirect / to /quote */}
            <Route path="/" element={<DailyQuotes />} />

            {/* fallback for unknown paths */}
            <Route path="*" element={<Navigate to="/home" replace />} />

            <Route path="/tiers" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}
