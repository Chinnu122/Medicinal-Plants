import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { OffersProvider } from "./contexts/OffersContext";
import { IntroScreen } from "./components/IntroScreen";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Plants from "./pages/Plants";
import PlantDetail from "./pages/PlantDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import "./global.css";

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="container mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4 text-herbal-600">{title}</h1>
      <p className="text-xl text-muted-foreground mb-8">
        This section is coming soon! Continue prompting to have me build out
        this page.
      </p>
      <div className="w-24 h-24 mx-auto bg-herbal-100 dark:bg-herbal-800 rounded-full flex items-center justify-center">
        <span className="text-3xl">🌿</span>
      </div>
    </div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introCompleted, setIntroCompleted] = useState(false);

  useEffect(() => {
    // Check if user has seen intro before
    const hasSeenIntro = localStorage.getItem("herbwise-intro-seen");
    if (hasSeenIntro) {
      setShowIntro(false);
      setIntroCompleted(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroCompleted(true);
    localStorage.setItem("herbwise-intro-seen", "true");
  };

  if (showIntro && !introCompleted) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <OffersProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/plants" element={<Plants />} />
                <Route path="/plants/:id" element={<PlantDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route
                  path="/order-confirmation/:orderId"
                  element={<OrderConfirmation />}
                />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:orderId" element={<Orders />} />
                <Route path="/assistant" element={<AIAssistant />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </OffersProvider>
      </CartProvider>
    </AuthProvider>
  );
}
