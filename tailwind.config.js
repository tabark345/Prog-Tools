// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gradientStart-light": "#e0f2ff",
        "gradientEnd-light": "#c7d2fe",
        "gradientStart-dark": "#0f172a",
        "gradientEnd-dark": "#1e293b",
        // خلفيات عامة
        "bg-light": "#f9fafb",
        "bg-dark": "#0f172a",

        // نصوص
        "text-light": "#1e293b",
        "text-dark": "#f8fafc",

        // أزرار
        "primary-light": "#6366f1", // indigo-500
        "primary-dark": "#818cf8", // indigo-400

        // حدود أو عناصر إضافية
        "border-light": "#e5e7eb", // gray-200
        "border-dark": "#334155", // slate-700
      },
      backgroundImage: {
        "form-light": "linear-gradient(to bottom right, #f0f9ff, #dbeafe)",
        "form-dark": "linear-gradient(to bottom right, #1e293b, #0f172a)",
      },
    },
  },
  plugins: [],
};
