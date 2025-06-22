// src/components/tools/ReadmeGenerator.jsx
import React, { useState } from 'react';

const ReadmeGenerator = () => {
  const [sections, setSections] = useState({
    title: '',
    description: '',
    installation: '',
    usage: '',
    features: '',
    contributors: '',
    license: 'MIT',
    badges: false,
    toc: false
  });

  const [preview, setPreview] = useState('');
  const [copied, setCopied] = useState(false);

  const generateMarkdown = () => {
    return `# ${sections.title || 'Project Title'}

${sections.badges ? `![License](https://img.shields.io/badge/license-${sections.license}-blue.svg)\n` : ''}

${sections.toc ? `## Table of Contents\n- [Description](#description)\n- [Installation](#installation)\n- [Usage](#usage)\n- [Features](#features)\n- [Contributors](#contributors)\n- [License](#license)\n\n` : ''}

${sections.description ? `## Description\n${sections.description}\n` : ''}

${sections.installation ? `## Installation\n\`\`\`bash\n${sections.installation}\n\`\`\`\n` : ''}

${sections.usage ? `## Usage\n${sections.usage}\n` : ''}

${sections.features ? `## Features\n${sections.features}\n` : ''}

${sections.contributors ? `## Contributors\n${sections.contributors}\n` : ''}

## License
This project is licensed under the ${sections.license} License - see the [LICENSE](LICENSE) file for details.
`;
  };

  const handlePreview = () => {
    setPreview(generateMarkdown());
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const downloadReadme = () => {
    const element = document.createElement('a');
    const file = new Blob([generateMarkdown()], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="mr-2">📝</span> منشئ ملف README.md
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={handlePreview}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
          >
            <span className="ml-1">معاينة</span>
          </button>
          <button 
            onClick={downloadReadme}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
          >
            <span className="ml-1">تحميل الملف</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {Object.keys(sections).map(key => {
            if (key === 'badges' || key === 'toc') {
              return (
                <div key={key} className="flex items-center">
                  <input
                    id={key}
                    type="checkbox"
                    checked={sections[key]}
                    onChange={(e) => setSections({...sections, [key]: e.target.checked})}
                    className="w-5 h-5 text-indigo-600 rounded"
                  />
                  <label htmlFor={key} className="ml-2 text-gray-700 capitalize">
                    {key === 'badges' ? 'إضافة شارات الرخصة' : 'إضافة جدول المحتويات'}
                  </label>
                </div>
              );
            }
            
            return (
              <div key={key} className="mb-4">
                <label className="block text-gray-700 mb-2 capitalize">
                  {key === 'title' ? 'العنوان' : 
                   key === 'description' ? 'الوصف' : 
                   key === 'installation' ? 'التثبيت' : 
                   key === 'usage' ? 'الاستخدام' : 
                   key === 'features' ? 'الميزات' : 
                   key === 'contributors' ? 'المساهمون' : 
                   'الرخصة'}
                </label>
                
                {key === 'installation' ? (
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                    rows="3"
                    value={sections[key]}
                    onChange={(e) => setSections({...sections, [key]: e.target.value})}
                    placeholder={`أدخل ${key}...`}
                  />
                ) : key === 'license' ? (
                  <select
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                    value={sections[key]}
                    onChange={(e) => setSections({...sections, [key]: e.target.value})}
                  >
                    <option value="MIT">MIT</option>
                    <option value="Apache-2.0">Apache 2.0</option>
                    <option value="GPL-3.0">GPL 3.0</option>
                    <option value="BSD-3-Clause">BSD 3-Clause</option>
                    <option value="Unlicense">Unlicense</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                    value={sections[key]}
                    onChange={(e) => setSections({...sections, [key]: e.target.value})}
                    placeholder={`أدخل ${key}...`}
                  />
                )}
              </div>
            );
          })}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">المعاينة:</h3>
            <button 
              onClick={copyToClipboard}
              className={`px-3 py-1 text-sm rounded-lg ${
                copied ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {copied ? 'تم النسخ! ✅' : 'نسخ إلى الحافظة'}
            </button>
          </div>
          <pre className="whitespace-pre-wrap bg-white p-4 rounded-lg max-h-[500px] overflow-auto font-mono text-sm">
            {preview || 'ستظهر معاينة الملف هنا بعد الضغط على زر "معاينة"...'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ReadmeGenerator;