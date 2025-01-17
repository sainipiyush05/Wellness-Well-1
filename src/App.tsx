import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DiseaseSelection from "./pages/DiseaseSelection";
import About from "./pages/About";
import Bootsplash from "./components/Bootsplash";
import Chatbot from "./components/Chatbot/ChatBot";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [showBootsplash, setShowBootsplash] = useState(true);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-surface-darker to-surface-dark text-white">
        {showBootsplash && (
          <Bootsplash onComplete={() => setShowBootsplash(false)} />
        )}

        <div className={showBootsplash ? "hidden" : ""}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/disease-selection" element={<DiseaseSelection />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Chatbot />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
