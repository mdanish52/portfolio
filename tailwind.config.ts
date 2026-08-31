import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#12172B", 800: "#1A2140", 700: "#232C54" },
        paper: "#F3EFE3",
        amber: { DEFAULT: "#E8B93A", soft: "#F3D67C" },
        line: "#2E3760",

        canvas: "#0B0C10",
        canvasSoft: "#111319",
        canvasRaised: "#15181F",
        inkText: "#F4F1E9",
        muted: "#8B93A6",
        accent: "#E8A23D",
        hairline: "#262A33"
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      keyframes: {
        blink: { "0%, 49%": { opacity: "1" }, "50%, 100%": { opacity: "0" } },
        "particle-float": {
          "0%":   { transform: "translateY(0) translateX(0)", opacity: "0" },
          "10%":  { opacity: "0.7" },
          "85%":  { opacity: "0.7" },
          "100%": { transform: "translateY(-140px) translateX(var(--drift, 16px))", opacity: "0" }
        },
        "scan-line": {
          "0%":   { transform: "translateY(-10%)", opacity: "0" },
          "15%":  { opacity: "0.5" },
          "85%":  { opacity: "0.5" },
          "100%": { transform: "translateY(110%)", opacity: "0" }
        },
        "aurora-spin": {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "grid-pulse": {
          "0%, 100%": { opacity: "0.15" },
          "50%":      { opacity: "0.35" }
        },
        "blob-morph": {
          "0%, 100%": { borderRadius: "50% 50% 50% 50%" },
          "33%":      { borderRadius: "60% 40% 55% 45%" },
          "66%":      { borderRadius: "45% 55% 40% 60%" }
        },
        "beam-sweep": {
          "0%":   { transform: "translateX(-30%) translateY(-30%) rotate(15deg)", opacity: "0" },
          "10%":  { opacity: "0.4" },
          "50%":  { opacity: "0.4" },
          "100%": { transform: "translateX(130%) translateY(30%) rotate(15deg)", opacity: "0" }
        },
        "dot-drift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%":      { transform: "translate(6px, -8px)" }
        }
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
        "particle-float": "particle-float linear infinite",
        "scan-line": "scan-line 7s ease-in-out infinite",
        "aurora-spin": "aurora-spin 30s linear infinite",
        "grid-pulse": "grid-pulse 6s ease-in-out infinite",
        "blob-morph": "blob-morph 12s ease-in-out infinite",
        "beam-sweep": "beam-sweep 8s ease-in-out infinite",
        "dot-drift": "dot-drift 10s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;