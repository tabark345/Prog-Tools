// src/components/tools/UnitConverter.jsx
import React, { useState, useEffect } from 'react';

const UnitConverter = () => {
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [pixel, setPixel] = useState('');
  const [rem, setRem] = useState('');
  const [em, setEm] = useState('');

  useEffect(() => {
    if (pixel !== '') {
      setRem((pixel / baseFontSize).toFixed(4));
      setEm((pixel / baseFontSize).toFixed(4));
    } else if (rem !== '') {
      setPixel((rem * baseFontSize).toFixed(2));
      setEm(rem);
    } else if (em !== '') {
      setPixel((em * baseFontSize).toFixed(2));
      setRem(em);
    }
  }, [pixel, rem, em, baseFontSize]);

  const resetValues = () => {
    setPixel('');
    setRem('');
    setEm('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-2">📏</span> محول الوحدات (Pixel ↔ Rem ↔ Em)
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">حجم الخط الأساسي (بالبكسل):</label>
            <div className="flex items-center">
              <input
                type="number"
                value={baseFontSize}
                onChange={(e) => setBaseFontSize(Number(e.target.value) || 16)}
                min="8"
                max="32"
                className="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
              />
              <span className="ml-2 text-gray-600">px</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              هذا هو حجم الخط الافتراضي للمتصفح (عادةً 16px)
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">بكسل (px):</label>
              <div className="flex">
                <input
                  type="number"
                  value={pixel}
                  onChange={(e) => setPixel(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  placeholder="أدخل القيمة"
                />
                <span className="px-4 py-2 bg-gray-100 border-t border-b border-r rounded-r-lg">px</span>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">ريم (rem):</label>
              <div className="flex">
                <input
                  type="number"
                  value={rem}
                  onChange={(e) => setRem(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  placeholder="أدخل القيمة"
                />
                <span className="px-4 py-2 bg-gray-100 border-t border-b border-r rounded-r-lg">rem</span>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">إم (em):</label>
              <div className="flex">
                <input
                  type="number"
                  value={em}
                  onChange={(e) => setEm(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  placeholder="أدخل القيمة"
                />
                <span className="px-4 py-2 bg-gray-100 border-t border-b border-r rounded-r-lg">em</span>
              </div>
            </div>
            
            <button
              onClick={resetValues}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              مسح الحقول
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-lg mb-4">معلومات عن الوحدات:</h3>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-800 mb-2">البكسل (px)</h4>
              <p className="text-sm text-gray-600">
                وحدة ثابتة تمثل نقطة واحدة على الشاشة. 1px = 1/96 من البوصة.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-800 mb-2">الريم (rem)</h4>
              <p className="text-sm text-gray-600">
                وحدة نسبية تعتمد على حجم الخط الأساسي (root element). 1rem = حجم الخط الأساسي.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-800 mb-2">الإم (em)</h4>
              <p className="text-sm text-gray-600">
                وحدة نسبية تعتمد على حجم الخط في العنصر الحالي. 1em = حجم الخط الحالي للعنصر.
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
            <h4 className="font-semibold text-indigo-800 mb-2">نصيحة:</h4>
            <p className="text-sm text-indigo-700">
              استخدم الوحدات النسبية (rem, em) لتصميمات تستجيب لأحجام الشاشات المختلفة، 
              واستخدم البكسل للعناصر التي يجب أن تحافظ على حجم ثابت.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;