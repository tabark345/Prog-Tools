// src/components/tools/CodeFormatter.jsx
import React, { useState } from 'react';

const CodeFormatter = () => {
  const [code, setCode] = useState('');
  const [formattedCode, setFormattedCode] = useState('');
  const [language, setLanguage] = useState('json');
  const [error, setError] = useState('');

  const formatCode = () => {
    setError('');
    try {
      if (language === 'json') {
        setFormattedCode(JSON.stringify(JSON.parse(code), null, 2));
      } else if (language === 'javascript') {
        // محاولة تنسيق جافاسكريبت باستخدام eval (لأغراض توضيحية فقط)
        // في تطبيق حقيقي، يجب استخدام مكتبة مثل prettier
        const formatted = code
          .replace(/(\{|\(|\[)\s*/g, '$1\n  ')
          .replace(/\s*(\}|\)|\])/g, '\n$1')
          .replace(/;\s*/g, ';\n')
          .replace(/,\s*/g, ',\n  ');
        setFormattedCode(formatted);
      } else {
        // تنسيق XML بسيط
        const formatted = code
          .replace(/>\s*</g, '>\n<')
          .replace(/(<(\w+)[^>]*>)/g, '$1\n')
          .replace(/(<\/\w+>)/g, '\n$1');
        setFormattedCode(formatted);
      }
    } catch (err) {
      setError(`خطأ في التنسيق: ${err.message}`);
      setFormattedCode('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedCode);
    alert('تم نسخ الكود المنسق إلى الحافظة!');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-2">📋</span> منسق الكود (JSON/XML/JavaScript)
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">اختر لغة البرمجة:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            >
              <option value="json">JSON</option>
              <option value="javascript">JavaScript</option>
              <option value="xml">XML</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">أدخل الكود:</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows="12"
              className="w-full px-3 py-2 border rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
              placeholder={`أدخل كود ${language.toUpperCase()} هنا...`}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={formatCode}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              تنسيق الكود
            </button>
            <button
              onClick={() => setCode('')}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              مسح
            </button>
          </div>
          
          {error && <div className="text-red-600 p-3 bg-red-50 rounded-lg">{error}</div>}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">الكود المنسق:</label>
          <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-[350px] overflow-auto font-mono text-sm">
            {formattedCode || 'سيظهر الكود المنسق هنا...'}
          </pre>
          
          {formattedCode && (
            <button
              onClick={copyToClipboard}
              className="mt-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center"
            >
              نسخ الكود المنسق
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeFormatter;