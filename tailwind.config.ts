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
        soft: "0 20px 60px -28px rgba(17, 24, 39, 0.18)",
        card: "0 16px 36px -24px rgba(17, 24, 39, 0.16)"
      },
      fontFamily: {
        sans: ["var(--font-manrope)"],
        serif: ["var(--font-newsreader)"]
      },
      backgroundImage: {
        "page-glow":
          "radial-gradient(circle at top left, rgba(125, 154, 255, 0.12), transparent 28%), radial-gradient(circle at 80% 0%, rgba(111, 177, 166, 0.12), transparent 24%)"
      }
    }
  },
  plugins: []
};

export default config;
