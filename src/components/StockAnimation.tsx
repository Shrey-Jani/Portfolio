import React from "react";
import "./StockAnimation.css";

interface StockAnimationProps {
  isActive?: boolean;
  size?: number;
}

// x-center, body top y, body height, wick top y, wick bottom y, direction
const CANDLES: [number, number, number, number, number, "up" | "down" | "peak"][] = [
  [14, 44, 12, 40, 60, "down"],
  [32, 36, 14, 32, 54, "up"],
  [50, 30, 12, 26, 46, "up"],
  [68, 26, 12, 22, 42, "down"],
  [86, 18, 14, 14, 36, "up"],
  [104, 10, 16, 6, 30, "peak"],
];

const TREND = "14,50 32,43 50,36 68,32 86,25 104,18";

const StockAnimation: React.FC<StockAnimationProps> = ({ isActive = false, size = 200 }) => {
  return (
    <div
      className={`stock-animation ${isActive ? "active" : ""}`}
      style={{ width: size, height: size * 0.62 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 72" width="100%" height="100%">
        <defs>
          <linearGradient id="stock-line" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cff" />
            <stop offset="100%" stopColor="#4be1ff" />
          </linearGradient>
          <linearGradient id="stock-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4be1ff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#4be1ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* baseline grid */}
        {[20, 36, 52].map((y) => (
          <line key={y} x1="4" y1={y} x2="116" y2={y} className="stock-grid" />
        ))}

        {/* candles */}
        {CANDLES.map(([x, top, h, wt, wb, dir], i) => (
          <g key={x} className={`stock-candle ${dir}`} style={{ ["--i" as any]: i }}>
            <line x1={x} y1={wt} x2={x} y2={wb} className="stock-wick" />
            <rect x={x - 4} y={top} width="8" height={h} rx="1.5" className="stock-body" />
          </g>
        ))}

        {/* trend area + line */}
        <polygon points={`${TREND} 104,72 14,72`} fill="url(#stock-area)" className="stock-fill" />
        <polyline
          points={TREND}
          fill="none"
          stroke="url(#stock-line)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stock-trend"
          pathLength={1}
        />

        {/* leading dot */}
        <circle cx="104" cy="18" r="3.2" className="stock-dot" />

        {/* ticker badge */}
        <g className="stock-badge">
          <path d="M8,14 l3,-4 l3,4 z" className="stock-arrow" />
          <text x="16" y="14" className="stock-pct">+24.6%</text>
        </g>
      </svg>
    </div>
  );
};

export default StockAnimation;
