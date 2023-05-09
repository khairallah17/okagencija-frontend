/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      // COLORS
      colors:{
        primary: {
          DEFAULT: "#24e0a1",
          light: "#0A6B4E"
        },
        light_gray: {
          DEFAULT: "#BCBEC0"
        },
        dark_gray: {
          DEFAULT: "#888888"
        },
        darker_gray: {
          DEFAULT: "#444444"
        },
        brown:{
          DEFAULT: "#C67B43"
        }
      },

      // FONTS
      fontFamily:{
        'nunito': ['Nunito Sans', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      }
    },

    // BACKGROUND IMAGES FLAGS
    backgroundImage: {
      'uk-flag': 'url("/flags/united-kingdom-flag.png")'
    }
  },

}

