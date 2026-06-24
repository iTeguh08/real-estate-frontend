// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    theme: {
      extend: {
        fontFamily: {
          // Gunakan untuk Judul Besar / Hero Section
          display: ['"Cormorant Garamond"', 'serif'],
          // Gunakan sebagai default body text, cards, dan form
          sans: ['Satoshi', 'sans-serif'],
        },
        colors: {
          luxury: {
            dark: '#111111',     // Menggantikan hitam pekat biasa
            cream: '#F9F8F6',    // Untuk background halaman agar tidak putih polos
            crimson: '#A31D1D',  // Aksen merah elegan seperti di image_d045f8.jpg
          }
        }
      },
    },
  }