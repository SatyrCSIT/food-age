/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,.06)",
        lift: "0 16px 40px rgba(15, 23, 42, .10)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        pulseSoft: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(79,70,229,.0)" },
          "50%": { boxShadow: "0 0 0 6px rgba(79,70,229,.08)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp .5s ease-out both",
        float: "float 6s ease-in-out infinite",
        sheen: "sheen 1.2s linear 1",
        pulseSoft: "pulseSoft 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
