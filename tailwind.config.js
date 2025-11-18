/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        bookconnect: {
          "primary": "#DB924B",        // Warm book spine orange (coffee theme base)
          "primary-focus": "#C17D3A",  // Deeper orange
          "primary-content": "#120C08", // Dark text
          
          "secondary": "#263E3F",      // Deep teal (vintage book covers)
          "secondary-focus": "#1A2C2D", // Darker teal
          "secondary-content": "#EDD9C8", // Light text
          
          "accent": "#794D3C",         // Rich leather brown
          "accent-focus": "#5D3A2D",   // Deeper leather
          "accent-content": "#EDD9C8", // Light text
          
          "neutral": "#20130F",        // Coffee base
          "neutral-focus": "#120C08",  // Darkest
          "neutral-content": "#EDD9C8", // Cream text
          
          "base-100": "#20130F",       // Dark coffee background
          "base-200": "#2C1810",       // Slightly lighter
          "base-300": "#3B2318",       // Medium tone
          "base-content": "#EDD9C8",   // Warm cream text
          
          "info": "#8DCAC1",           // Soft mint
          "success": "#7BA05B",        // Sage green
          "warning": "#DB924B",        // Warm orange
          "error": "#E45F35",          // Warm red
          
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.375rem",
          "--rounded-badge": "0.25rem",
        },
      },
      "coffee",    // Fallback DaisyUI theme
      "autumn",    // Alternative warm theme
      "luxury",    // Evening reading vibe
      "winter",    // Clean alternative
    ],
  },
};
