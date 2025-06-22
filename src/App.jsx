// src/App.jsx
import React, { useState } from 'react';
import ReadmeGenerator from './components/tools/ReadmeGenerator';
import CodeFormatter from './components/tools/CodeFormatter';
import ColorPaletteGenerator from './components/tools/ColorPaletteGenerator';
import UnitConverter from './components/tools/UnitConverter';
import LoremIpsumGenerator from './components/tools/LoremIpsumGenerator';
import GithubUrlAnalyzer from './components/tools/GithubUrlAnalyzer';
import FolderStructureGenerator from './components/tools/FolderStructureGenerator';

const App = () => {
  const [activeTool, setActiveTool] = useState('readme');
  
  const tools = [
    { id: 'readme', name: 'منشئ README.md', icon: '📝' },
    { id: 'formatter', name: 'منسق الكود', icon: '📋' },
    { id: 'color', name: 'مولّد الألوان', icon: '🎨' },
    { id: 'unit', name: 'محول الوحدات', icon: '📏' },
    { id: 'lorem', name: 'مولّد النصوص', icon: '✍️' },
    { id: 'github', name: 'محلل GitHub', icon: '🐙' },
    { id: 'folder', name: 'مولّد الهيكل', icon: '📁' }
  ];

  const renderTool = () => {
    switch(activeTool) {
      case 'readme': return <ReadmeGenerator />;
      case 'formatter': return <CodeFormatter />;
      case 'color': return <ColorPaletteGenerator />;
      case 'unit': return <UnitConverter />;
      case 'lorem': return <LoremIpsumGenerator />;
      case 'github': return <GithubUrlAnalyzer />;
      case 'folder': return <FolderStructureGenerator />;
      default: return <ReadmeGenerator />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      <header className="bg-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-white text-indigo-700 p-2 rounded-lg mr-3">
              <span className="text-2xl">👨‍💻</span>
            </div>
            <h1 className="text-2xl font-bold">أدوات المبرمجين المتكاملة</h1>
          </div>
          <div className="text-sm bg-indigo-800 px-4 py-2 rounded-full">
            تم التطوير باستخدام: React.js + Vite + Tailwind CSS v4.1.10
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* شريط الأدوات الجانبي */}
          <div className="lg:w-1/4 bg-white rounded-xl shadow-lg p-4 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700 border-b pb-2">قائمة الأدوات</h2>
            <ul className="space-y-2">
              {tools.map(tool => (
                <li key={tool.id}>
                  <button
                    onClick={() => setActiveTool(tool.id)}
                    className={`w-full text-left flex items-center p-3 rounded-lg transition-all ${
                      activeTool === tool.id 
                        ? 'bg-indigo-100 text-indigo-700 font-semibold shadow-inner' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xl mr-3">{tool.icon}</span>
                    {tool.name}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-2">حول التطبيق</h3>
              <p className="text-sm text-gray-600">
                هذا التطبيق يوفر مجموعة من الأدوات المفيدة للمبرمجين والمطورين لتسريع سير العمل وتحسين الإنتاجية.
              </p>
            </div>
          </div>
          
          {/* منطقة الأدوات الرئيسية */}
          <div className="lg:w-3/4">
            {renderTool()}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 أدوات المبرمجين المتكاملة - تم التطوير باستخدام React وVite وTailwind CSS</p>
          <p className="mt-2 text-sm">جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
};

export default App;