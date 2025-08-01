import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Medicinal plants brand colors
        herbal: {
          50: "hsl(var(--herbal-50))",
          100: "hsl(var(--herbal-100))",
          200: "hsl(var(--herbal-200))",
          300: "hsl(var(--herbal-300))",
          400: "hsl(var(--herbal-400))",
          500: "hsl(var(--herbal-500))",
          600: "hsl(var(--herbal-600))",
          700: "hsl(var(--herbal-700))",
          800: "hsl(var(--herbal-800))",
          900: "hsl(var(--herbal-900))",
        },
        nature: {
          50: "hsl(var(--nature-50))",
          100: "hsl(var(--nature-100))",
          200: "hsl(var(--nature-200))",
          300: "hsl(var(--nature-300))",
          400: "hsl(var(--nature-400))",
          500: "hsl(var(--nature-500))",
          600: "hsl(var(--nature-600))",
          700: "hsl(var(--nature-700))",
          800: "hsl(var(--nature-800))",
          900: "hsl(var(--nature-900))",
        },
        earth: {
          50: "hsl(var(--earth-50))",
          100: "hsl(var(--earth-100))",
          200: "hsl(var(--earth-200))",
          300: "hsl(var(--earth-300))",
          400: "hsl(var(--earth-400))",
          500: "hsl(var(--earth-500))",
          600: "hsl(var(--earth-600))",
          700: "hsl(var(--earth-700))",
          800: "hsl(var(--earth-800))",
          900: "hsl(var(--earth-900))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
