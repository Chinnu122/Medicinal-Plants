import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IntroScreen } from "./components/IntroScreen";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
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
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/plants"
            element={<PlaceholderPage title="Medicinal Plants Database" />}
          />
          <Route
            path="/search"
            element={<PlaceholderPage title="Plant Search" />}
          />
          <Route
            path="/assistant"
            element={<PlaceholderPage title="AI Assistant" />}
          />
          <Route
            path="/settings"
            element={<PlaceholderPage title="Settings" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
