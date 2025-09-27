import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Technology from "./components/Technology";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LiquidEther from "./components/LiquidEther";
import { useTheme } from "./hooks/useTheme";
import { useScrollReveal } from "./hooks/useScrollReveal";
import "./styles/index.css";

const App: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  useScrollReveal();

  return (
    <div className="App" style={{ position: "relative", minHeight: "100vh" }}>
      {/* LiquidEther Background Only */}
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
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
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
      </div>

      <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />

      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Technology />
        <br />
        <Projects />
        <Experience />

        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
