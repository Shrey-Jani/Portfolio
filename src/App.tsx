import React, { useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certificates from "./components/Certificates";
import LiquidEther from "./components/LiquidEther";
import Lightfall from "./components/Lightfall";
import Ferrofluid from "./components/Ferrofluid";
import Hyperspeed from "./components/Hyperspeed";
import Galaxy from "./components/Galaxy";
import LineSidebar from "./components/LineSidebar";
import { useTheme } from "./hooks/useTheme";
import "./styles/index.css";
import "./styles/redesign.css";

// Stable (module-level) options so Hyperspeed's WebGL scene isn't rebuilt on
// every render — theme-matched violet/cyan car lights.
const HYPERSPEED_OPTIONS = {
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x05060a,
    shoulderLines: 0x8b5cff,
    brokenLines: 0x8b5cff,
    leftCars: [0x8b5cff, 0xc47bff, 0x6750a2],
    rightCars: [0x4be1ff, 0x0e5ea5, 0x03b3c3],
    sticks: 0x4be1ff,
  },
};

// Reset scroll to top on every route change.
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Route- and theme-aware fixed background. Ferrofluid takes over on Projects.
const Background: React.FC<{ isDarkTheme: boolean; liquidEtherColors: string[] }> = ({
  isDarkTheme,
  liquidEtherColors,
}) => {
  const { pathname } = useLocation();
  const isProjects = pathname === "/projects";
  const isExperience = pathname === "/experience";
  const isCertificates = pathname === "/certificates";
  const isHome = pathname === "/";

  const scrim = !isDarkTheme
    ? "radial-gradient(130% 100% at 50% -10%, rgba(244,242,251,0.25) 0%, rgba(244,242,251,0.6) 55%, var(--bg) 100%)"
    : isHome
    ? "linear-gradient(90deg, var(--bg) 0%, rgba(5,6,10,0.72) 30%, rgba(5,6,10,0.15) 62%, transparent 100%), radial-gradient(130% 100% at 50% -5%, transparent 30%, rgba(5,6,10,0.55) 70%, var(--bg) 100%)"
    : "radial-gradient(120% 90% at 50% 30%, transparent 20%, rgba(5,6,10,0.55) 65%, var(--bg) 100%)";

  return (
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
      {isDarkTheme && isProjects ? (
        <Ferrofluid
          colors={["#8B5CFF", "#4BE1FF", "#C47BFF"]}
          speed={0.4}
          scale={1.5}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={2.5}
          shimmer={1.2}
          glow={1.6}
          flowDirection="down"
          opacity={0.85}
          mouseInteraction={true}
          mouseStrength={1}
          mouseRadius={0.3}
        />
      ) : isDarkTheme && isExperience ? (
        <Hyperspeed effectOptions={HYPERSPEED_OPTIONS as any} />
      ) : isDarkTheme && isCertificates ? (
        <Galaxy
          hueShift={250}
          saturation={0.7}
          density={1.2}
          glowIntensity={0.4}
          twinkleIntensity={0.4}
          starSpeed={0.4}
          rotationSpeed={0.05}
          mouseInteraction={true}
          mouseRepulsion={true}
          repulsionStrength={2}
          transparent={true}
        />
      ) : isDarkTheme ? (
        <Lightfall
          colors={["#8B5CFF", "#4BE1FF", "#C47BFF"]}
          backgroundColor="#221654"
          speed={0.4}
          streakCount={3}
          streakWidth={1}
          streakLength={1}
          glow={0.9}
          density={0.7}
          twinkle={1}
          zoom={3}
          backgroundGlow={0.5}
          opacity={0.95}
          mouseInteraction={true}
          mouseStrength={0.6}
          mouseRadius={1}
        />
      ) : (
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
      )}
      {/* Scrim to seat content over the background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: scrim,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

const App: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  const liquidEtherColors = isDarkTheme
    ? ["#3a1d7a", "#1b3a6b", "#5a2a8f"]
    : ["#7A2FE6", "#A855F7", "#0AA2C9"];

  return (
    <HashRouter>
      <div className="App" style={{ position: "relative", minHeight: "100vh" }}>
        {/* Route- and theme-aware background (persists across route changes) */}
        <Background
          isDarkTheme={isDarkTheme}
          liquidEtherColors={liquidEtherColors}
        />

        <ScrollToTop />
        <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
        <LineSidebar />

        <main style={{ position: "relative", zIndex: 1 }} className="page-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
