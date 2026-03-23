import React from "react";
import Header from "./components/Header";
import Hero from "./components/About";
import Technology from "./components/Technology";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LiquidEther from "./components/LiquidEther";
import Lightning from "./components/Lightning";
import Silk from "./components/Silk";
import { useTheme } from "./hooks/useTheme";
import { useScrollReveal } from "./hooks/useScrollReveal";
import "./styles/index.css";

const App: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  useScrollReveal();

  // Theme-based colors for LiquidEther
  const liquidEtherColors = isDarkTheme
    ? ["#5227FF", "#FF9FFC", "#B19EEF"] // Original colors for dark theme
    : ["#4A148C", "#6A0DAD", "#8A2BE2"]; // Dark royal purple for light theme

  return (
    <div className="App" style={{ position: "relative", minHeight: "100vh" }}>
      {/* Theme-based Background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -2,
        }}
      >
        {isDarkTheme ? (
          <LiquidEther
            colors={liquidEtherColors}
            mouseForce={30}
            cursorSize={120}
            isViscous={false}
            viscous={20}
            iterationsViscous={16}
            iterationsPoisson={16}
            resolution={0.3}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.3}
            autoIntensity={1.5}
            takeoverDuration={0.3}
            autoResumeDelay={3000}
            autoRampDuration={0.8}
          />
        ) : (
          <Silk
            speed={5}
            scale={1}
            color="#6A0DAD"
            noiseIntensity={1.5}
            rotation={0}
          />
        )}
      </div>

      <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />

      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Technology />
        <br />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
