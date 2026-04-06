import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        card: "hsl(var(--card))",
        accent: "hsl(var(--accent))",
        "accent-soft": "hsl(var(--accent-soft))",
        "accent-foreground": "hsl(var(--accent-foreground))"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem"
      },
      boxShadow: {
        soft: "0 28px 80px -42px rgba(23, 36, 56, 0.34)",
        card: "0 34px 90px -48px rgba(23, 36, 56, 0.34)"
      },
      fontFamily: {
        sans: ["var(--font-manrope)"],
        serif: ["var(--font-newsreader)"]
      },
      backgroundImage: {
        "page-glow":
          "radial-gradient(circle at 12% 12%, rgba(255,255,255,0.82), transparent 22%), radial-gradient(circle at 82% 18%, rgba(139, 159, 185, 0.32), transparent 28%), radial-gradient(circle at 74% 78%, rgba(184, 172, 151, 0.18), transparent 24%)"
      }
    }
  },
  plugins: []
};

export default config;
