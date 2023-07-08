/** @type {import('tailwindcss').Config} */
import plugin from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Urbanist: ["Urbanist", "sans-serif"],
      },
      fontSize: {
        "text-xs": "12px",
        "text-sm": "14px",
        "text-base": "16px",
        "text-lg": "18px",
        "text-xl": "24px",
        "text-2xl": "32px",
        "text-3xl": "42px",
        "text-4xl": "72px",
      },
      colors: {
        "primary-black": "#262D33",
        "secondary-blue": "#1A9FF2",
        "secondary-green": "#3DC47E",
        "secondary-yellow": "#FFE83B",
        "secondary-red": "#D6484C",
        "neutral-dark-grey": "#737373",
        "neutral-grey": "#B9B9B9",
        "neutral-soft-grey": "#E7E7E7",
        "neutral-light-grey": "#F3F3F3",
        "label-orange": "#FEF1EA",
        "label-soft-green": "#EFF6E9",
        "label-blue": "#E5F5FF",
        "gradient-orange": "linear-gradient(90deg, #FF8444 0%, #EE641C 100%)",
        "label-green": "#62A824",
        "transparent-30": "rgba(0, 0, 0, 0.30)",
        "transparent-20": "rgba(0, 0, 0, 0.20)",
        "transparent-10": "rgba(0, 0, 0, 0.10)",
      },
    },
  },
  plugins: [
    plugin({
      strategy: "base",
    }),
  ],
};
