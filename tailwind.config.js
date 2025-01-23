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
        'custom-purple': 'rgb(20, 4, 34)',    // Corrigido
      },
      screens: {
        sm: '640px',  // Pequenas telas
        md: '768px',  // Médias telas
        lg: '1024px', // Telas grandes
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
