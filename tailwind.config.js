/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        body: ["'Space Grotesk'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#0D0D0F",
          2: "#131316",
          3: "#1A1A1E",
          4: "#222228",
        },
        or: {
          DEFAULT: "#FF6B2B",
          light: "#FF8C55",
          lighter: "#FFB347",
        },
      },
      animation: {
        "slide-up": "slideUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-up": "fadeUp 0.8s forwards",
        "grid-drift": "gridDrift 22s linear infinite",
        "orb-float": "orbFloat 14s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        blink: "blink 1s step-end infinite",
        pulse2: "pulse2 2s step-end infinite",
      },
      keyframes: {
        slideUp: { to: { transform: "translateY(0)" } },
        fadeUp: { to: { opacity: "1", transform: "translateY(0)" } },
        gridDrift: { to: { backgroundPosition: "72px 72px" } },
        orbFloat: {
          "0%,100%": { transform: "translateY(-50%) scale(1)" },
          "50%": { transform: "translateY(-55%) scale(1.04)" },
        },
        marquee: { to: { transform: "translateX(-50%)" } },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        pulse2: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.2" } },
      },
    },
  },
  plugins: [],
};
