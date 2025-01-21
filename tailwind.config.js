/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: [
    "./index.html",         // Adicione o HTML principal
    "./src/**/*.{js,ts,jsx,tsx}", // Inclua todos os arquivos na pasta src
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
