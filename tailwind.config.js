/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",         // Adicione o HTML principal
    "./src/**/*.{js,ts,jsx,tsx}", // Inclua todos os arquivos na pasta src
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': 'rgb(12,0,21)',  // Usando RGB
        'custom-red': 'rgb(255, 99, 71)',
        'custom-purple': 'rgb(20, 4, 34)',
        'custom-campos': 'rgb(34, 15, 51)',    // Corrigido
      },
      screens: {
        xs: '320px',  // Telas pequenas
        sm: '440px',  // Pequenas telas
        md: '810px',  // Médias telas
        lg: '1440px', // Telas grandes
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
