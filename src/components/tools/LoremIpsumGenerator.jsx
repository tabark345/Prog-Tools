// src/components/tools/LoremIpsumGenerator.jsx
import React, { useState } from 'react';

const LoremIpsumGenerator = () => {
  const [unit, setUnit] = useState('paragraphs');
  const [count, setCount] = useState(3);
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const loremText = `لوريم إيبسوم هو نص بديل يستخدم في التصميم الجرافيكي وطباعة النصوص. يتم استخدامه كبديل عن النص الحقيقي عندما لا يكون النص النهائي متوفرًا بعد. يستخدم لوريم إيبسوم أيضًا في اختبارات قوالب التصميم والطباعة. نظرًا لأن لوريم إيبسوم يشبه النص الحقيقي، فإنه يساعد المصممين على تجنب انتباه القارئ إلى التصميم بدلاً من المحتوى. يتم إنشاء لوريم إيبسوم عادةً عن طريق توليد سلسلة من الكلمات العشوائية التي تشبه النص الحقيقي، مما يجعله مفيدًا في إنشاء نماذج أولية وتخطيطات التصميم.`;

  const generateText = () => {
    let result = '';
    
    if (unit === 'paragraphs') {
      for (let i = 0; i < count; i++) {
        result += loremText + '\n\n';
      }
    } else if (unit === 'sentences') {
      const sentences = loremText.split('. ');
      for (let i = 0; i < count; i++) {
        result += sentences[i % sentences.length] + '. ';
      }
    } else if (unit === 'words') {
      const words = loremText.split(' ');
      for (let i = 0; i < count; i++) {
        result += words[i % words.length] + ' ';
      }
    }
    
    setText(result.trim());
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-2">✍️</span> مولّد نصوص لوريم إيبسوم
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-gray-700 mb-2">الوحدة:</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
              >
                <option value="words">كلمات</option>
                <option value="sentences">جمل</option>
                <option value="paragraphs">فقرات</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">العدد:</label>
              <input
                type="number"
                min="1"
                max={unit === 'paragraphs' ? 20 : unit === 'sentences' ? 50 : 500}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
              />
            </div>
            
            <div className="self-end">
              <button
                onClick={generateText}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                توليد النص
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">النص المولّد:</label>
            <textarea
              value={text}
              readOnly
              rows="10"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
              placeholder="سيظهر النص هنا بعد التوليد..."
            />
            
            {text && (
              <button
                onClick={copyToClipboard}
                className={`mt-3 px-4 py-2 rounded-lg flex items-center ${
                  copied ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {copied ? 'تم النسخ! ✅' : 'نسخ النص'}
              </button>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-lg mb-4">حول لوريم إيبسوم:</h3>
          <p className="text-gray-600 mb-4">
            لوريم إيبسوم هو نص شكلي يستخدم في تصميم الجرافيك والنشر لملء المساحات النصية في التصاميم. 
            الهدف منه هو إظهار الشكل العام للنص دون الاعتماد على محتوى ذو معنى.
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h4 className="font-medium text-gray-800 mb-2">استخدامات شائعة:</h4>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>ملء مساحات النص في التصاميم الأولية</li>
              <li>اختبار تخطيطات الصفحات وتصميمات الويب</li>
              <li>عرض أشكال الخطوط وأنماط الطباعة</li>
              <li>توفير محتوى نصي مؤقت أثناء التطوير</li>
            </ul>
          </div>
          
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h4 className="font-semibold text-indigo-800 mb-2">معلومة:</h4>
            <p className="text-sm text-indigo-700">
              نص لوريم إيبسوم المستخدم هنا هو ترجمة عربية للنص اللاتيني التقليدي، 
              مما يجعله مناسبًا للتصاميم التي تستهدف المتحدثين باللغة العربية.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoremIpsumGenerator;