/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "var(--selticket-primary-color)",
        "primary-container": "var(--selticket-primary-color-container)",
        "on-primary": "var(--selticket-on-primary-color)",
        "on-primary-container": "var(--selticket-on-primary-color-container)",
        "secondary": "var(--selticket-secondary-color)",
        "secondary-container": "var(--selticket-secondary-color-container)",
        "on-secondary": "var(--selticket-on-secondary-color)",
        "tertiary": "var(--selticket-accent-color)",
        "tertiary-container": "var(--selticket-accent-color-container)",
      },
      fontFamily: {
        shabnam: "selticket-Shabnam-farsi",
      },
    },
  },
  plugins: [],
  prefix: "selticket-"
}

