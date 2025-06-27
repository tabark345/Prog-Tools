import React, { useState, useEffect } from "react";
import ReadmeGenerator from "./components/tools/ReadmeGenerator";
import CodeFormatter from "./components/tools/CodeFormatter";
import ColorPaletteGenerator from "./components/tools/ColorPaletteGenerator";
import UnitConverter from "./components/tools/UnitConverter";
import LoremIpsumGenerator from "./components/tools/LoremIpsumGenerator";
import GithubUrlAnalyzer from "./components/tools/GithubUrlAnalyzer";
import FolderStructureGenerator from "./components/tools/FolderStructureGenerator";
import UuidGenerator from "./components/tools/UuidGenerator";
import Base64Tool from "./components/tools/Base64Tool";
import QrCodeGenerator from "./components/tools/QrCodeGenerator";
import MarkdownToHtml from "./components/tools/MarkdownToHtml";
import PasswordGenerator from "./components/tools/PasswordGenerator";
import RegexTester from "./components/tools/RegexTester";
import TextTransformer from "./components/tools/TextTransformer";
import LanguageFixer from "./components/tools/LanguageFixer";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [activeTool, setActiveTool] = useState("readme");
  const [darkMode, setDarkMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  console.log("Dark mode is:", darkMode);

  const tools = [
    { id: "readme", name: "منشئ README.md", icon: "📝" },
    { id: "formatter", name: "منسق الكود", icon: "📋" },
    { id: "color", name: "مولّد الألوان", icon: "🎨" },
    { id: "unit", name: "محول الوحدات", icon: "📏" },
    { id: "lorem", name: "مولّد النصوص", icon: "✍️" },
    { id: "github", name: "محلل GitHub", icon: "🐙" },
    { id: "folder", name: "مولّد الهيكل", icon: "📁" },
    { id: "UUID", name: "مولّد UUID", icon: "📑" },
    { id: "base64", name: "أداة Base64", icon: "🔐" },
    { id: "qrcode", name: "منشئ QR Code", icon: "📱" },
    { id: "markdown", name: "Markdown إلى HTML", icon: "🧾" },
    { id: "password", name: "منشئ كلمات مرور", icon: "🔒" },
    { id: "regex", name: "مختبر Regex", icon: "🧬" },
    { id: "texttransform", name: "🔁 محول النصوص", icon: "🔁" },
    { id: "languagefixer", name: "🔁 محول لوحة المفاتيح", icon: "🔁" },
  ];

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) setDarkMode(JSON.parse(savedMode));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderTool = () => {
    switch (activeTool) {
      case "readme":
        return <ReadmeGenerator />;
      case "formatter":
        return <CodeFormatter />;
      case "color":
        return <ColorPaletteGenerator />;
      case "unit":
        return <UnitConverter />;
      case "lorem":
        return <LoremIpsumGenerator />;
      case "github":
        return <GithubUrlAnalyzer />;
      case "folder":
        return <FolderStructureGenerator />;
      case "UUID":
        return <UuidGenerator />;
      case "base64":
        return <Base64Tool />;
      case "qrcode":
        return <QrCodeGenerator />;
      case "markdown":
        return <MarkdownToHtml />;
      case "password":
        return <PasswordGenerator />;
      case "regex":
        return <RegexTester />;
      case "texttransform":
        return <TextTransformer />;
      case "languagefixer":
        return <LanguageFixer />;
      default:
        return <ReadmeGenerator />;
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 bg-gradient-to-br ${
        darkMode
          ? "from-gradientStart-dark to-gradientEnd-dark text-text-dark"
          : "from-gradientStart-light to-gradientEnd-light text-text-light"
      }`}
    >
      <header className="bg-indigo-700 dark:bg-indigo-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-white text-indigo-700 p-2 rounded-lg mr-3">
              <span className="text-2xl">👨‍💻</span>
            </div>
            <h1 className="text-2xl font-bold">أدوات المبرمجين المتكاملة</h1>
          </div>
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-white text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-100 transition"
            >
              {darkMode ? "☀️ الوضع النهاري" : "🌙 الوضع الليلي"}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            📂 عرض/إخفاء الأدوات
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {(showSidebar || isLargeScreen) && (
            <Sidebar
              tools={tools}
              activeTool={activeTool}
              setActiveTool={setActiveTool}
              setShowSidebar={setShowSidebar}
            />
          )}
          <div className="lg:w-3/4 w-full">{renderTool()}</div>
        </div>
      </main>

      <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>
            © 2025 أدوات المبرمجين المتكاملة - تم التطوير باستخدام React وVite
            وTailwind CSS
          </p>
          <p className="mt-2 text-sm">جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
