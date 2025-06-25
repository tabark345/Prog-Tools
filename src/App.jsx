// src/App.jsx
import React, { useState, useEffect } from "react";
import ReadmeGenerator from "./components/tools/ReadmeGenerator";
import CodeFormatter from "./components/tools/CodeFormatter";
import ColorPaletteGenerator from "./components/tools/ColorPaletteGenerator";
import UnitConverter from "./components/tools/UnitConverter";
import LoremIpsumGenerator from "./components/tools/LoremIpsumGenerator";
import GithubUrlAnalyzer from "./components/tools/GithubUrlAnalyzer";
import FolderStructureGenerator from "./components/tools/FolderStructureGenerator";
import UuidGenerator from "./components/tools/UuidGenerator";

// أدوات جديدة
import Base64Tool from "./components/tools/Base64Tool";
import QrCodeGenerator from "./components/tools/QrCodeGenerator";
import MarkdownToHtml from "./components/tools/MarkdownToHtml";
import PasswordGenerator from "./components/tools/PasswordGenerator";
import RegexTester from "./components/tools/RegexTester";
import TextTransformer from "./components/tools/TextTransformer";
import LanguageFixer from "./components/tools/LanguageFixer";

const App = () => {
  const [activeTool, setActiveTool] = useState("readme");
  const [darkMode, setDarkMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* رأس الصفحة */}
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
        {/* زر عرض الشريط الجانبي في الجوال */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            📂 عرض/إخفاء الأدوات
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* الشريط الجانبي */}
          {(showSidebar || window.innerWidth >= 1024) && (
            <div className="lg:w-1/4 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 h-fit">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300 border-b pb-2">
                قائمة الأدوات
              </h2>
              <ul className="space-y-2">
                {tools.map((tool) => (
                  <li key={tool.id}>
                    <button
                      onClick={() => {
                        setActiveTool(tool.id);
                        setShowSidebar(false);
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }, 100);
                      }}
                      className={`w-full text-right flex items-center justify-start p-3 rounded-lg transition-all ${
                        activeTool === tool.id
                          ? "bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-white font-semibold shadow-inner"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span className="text-xl ml-3">{tool.icon}</span>
                      {tool.name}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="font-semibold text-gray-700 dark:text-gray-100 mb-2">
                  حول التطبيق
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  هذا التطبيق يوفر مجموعة من الأدوات المفيدة للمبرمجين لتسريع
                  العمل وتحسين الإنتاجية.
                </p>
              </div>
            </div>
          )}

          {/* منطقة الأدوات */}
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
