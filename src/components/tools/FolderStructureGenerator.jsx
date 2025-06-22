// src/components/tools/FolderStructureGenerator.jsx
import React, { useState } from 'react';

const FolderStructureGenerator = () => {
  const [structure, setStructure] = useState('');
  const [tree, setTree] = useState('');
  const [copied, setCopied] = useState(false);

  const exampleStructure = `src/
  components/
    layout/
      Header.jsx
      Footer.jsx
    tools/
      ReadmeGenerator.jsx
      CodeFormatter.jsx
    ui/
      Button.jsx
      Card.jsx
  pages/
    Home.jsx
    About.jsx
  utils/
    helpers.js
    api.js
  App.jsx
  main.jsx
index.css
`;

    const parseStructure = () => {
        const lines = structure.split('\n').filter(line => line.trim() !== '');
        let result = '';
        
        lines.forEach(line => {
        const depth = (line.match(/^\s*/) || [''])[0].length;
        const name = line.trim();
        
        // حساب المسافة البادئة
        const indent = '  '.repeat(depth);
        
        // إضافة رمز المجلد أو الملف
        const isFolder = name.endsWith('/') || (lines.some(l => l.startsWith(' '.repeat(depth + 2) + l.trim())) && !name.includes('.'));
        const icon = isFolder ? '📁 ' : '📄 ';
        
        result += `${indent}${icon}${name}\n`;
        });
        setTree(result);
        setCopied(false);
    }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tree);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const loadExample = () => {
    setStructure(exampleStructure);
    setTimeout(() => parseStructure(), 100);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-2">📁</span> مولّد هيكل المجلدات والملفات
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-gray-700">أدخل هيكل المجلدات:</label>
            <button
              onClick={loadExample}
              className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              تحميل مثال
            </button>
          </div>
          <textarea
            value={structure}
            onChange={(e) => setStructure(e.target.value)}
            rows="12"
            className="w-full px-3 py-2 border rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            placeholder={`مثال:\nsrc/\n  components/\n    layout/\n    tools/\n  pages/\n  utils/\nApp.jsx\nmain.jsx`}
          />
          
          <button
            onClick={parseStructure}
            className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            توليد الشجرة
          </button>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-gray-700">هيكل الشجرة:</label>
            {tree && (
              <button
                onClick={copyToClipboard}
                className={`px-3 py-1 text-sm rounded ${
                  copied ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {copied ? 'تم النسخ! ✅' : 'نسخ الشجرة'}
              </button>
            )}
          </div>
          <pre className="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[250px] font-mono text-sm whitespace-pre-wrap">
            {tree || 'ستظهر شجرة المجلدات هنا بعد التوليد...'}
          </pre>
          
          <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-2">تعليمات الاستخدام:</h3>
            <ul className="list-disc pl-5 text-yellow-700 space-y-1 text-sm">
              <li>استخدم المسافات للدلالة على مستوى التعشيش (المسافة = 2 فراغات)</li>
              <li>أضف / في نهاية اسم المجلد للإشارة إلى أنه مجلد</li>
              <li>الملفات يجب أن تحتوي على امتداد (مثل .jsx, .css, إلخ)</li>
              <li>المجلدات يمكن أن تحتوي على مجلدات وملفات فرعية</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


export default FolderStructureGenerator;