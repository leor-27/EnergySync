// n

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        "primary-foreground": "#ffffff",
        secondary: "#64748b",
        "secondary-foreground": "#ffffff",
        border: "#e5e7eb",
        muted: "#f3f4f6",
        destructive: "#ef4444",
        ring: "#3b82f6",
        background: "#ffffff",
        foreground: "#000000",
      },
    },
  },
  plugins: [],
}