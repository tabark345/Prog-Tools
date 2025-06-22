// src/components/tools/ColorPaletteGenerator.jsx
import React, { useState, useEffect } from 'react';

const ColorPaletteGenerator = () => {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [palette, setPalette] = useState([]);
  const [copied, setCopied] = useState(null);

  // دالة لتحويل HEX إلى RGB
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  // دالة لتحويل RGB إلى HEX
  const rgbToHex = (r, g, b) => {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  useEffect(() => {
    // توليد لوحة الألوان مباشرة داخل useEffect
    const generatePalette = () => {
      const baseRgb = hexToRgb(baseColor);
      const newPalette = [];
      
      // توليد تدرجات اللون
      for (let i = 0; i < 5; i++) {
        const factor = 0.2 * (i + 1);
        const newR = Math.round(baseRgb.r * (1 - factor));
        const newG = Math.round(baseRgb.g * (1 - factor));
        const newB = Math.round(baseRgb.b * (1 - factor));
        const hexColor = rgbToHex(newR, newG, newB);
        
        newPalette.push({
          hex: hexColor,
          rgb: `rgb(${newR}, ${newG}, ${newB})`,
          name: `shade-${500 - i * 100}`
        });
      }
      
      // إضافة اللون الأساسي
      newPalette.splice(2, 0, {
        hex: baseColor,
        rgb: `rgb(${baseRgb.r}, ${baseRgb.g}, ${baseRgb.b})`,
        name: 'base'
      });
      
      setPalette(newPalette);
    };

    generatePalette();
  }, [baseColor]); // الاعتماد على baseColor فقط

  const copyToClipboard = (color, type) => {
    navigator.clipboard.writeText(type === 'hex' ? color.hex : color.rgb);
    setCopied(`${type}-${color.hex}`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-2">🎨</span> مولّد لوحة الألوان
      </h2>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-1/3">
          <label className="block text-gray-700 mb-3">اختر اللون الأساسي:</label>
          <div className="flex items-center">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-16 h-12 cursor-pointer"
            />
            <span className="ml-3 text-lg font-mono">{baseColor}</span>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <div className="grid grid-cols-5 gap-4">
            {palette.map((color, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-full h-24 rounded-lg shadow-md mb-2 border border-gray-200"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => copyToClipboard(color, 'hex')}
                ></div>
                <div className="text-xs">
                  <div 
                    className={`font-mono cursor-pointer ${copied === `hex-${color.hex}` ? 'text-green-600 font-bold' : ''}`}
                    onClick={() => copyToClipboard(color, 'hex')}
                  >
                    {color.hex}
                  </div>
                  <div 
                    className={`font-mono text-gray-600 cursor-pointer ${copied === `rgb-${color.hex}` ? 'text-green-600 font-bold' : ''}`}
                    onClick={() => copyToClipboard(color, 'rgb')}
                  >
                    {color.rgb}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="font-semibold text-indigo-800 mb-2">نصائح لاستخدام الألوان:</h3>
        <ul className="list-disc pl-5 text-indigo-700 space-y-1">
          <li>استخدم الألوان الفاتحة للنص على الخلفيات الداكنة والعكس صحيح</li>
          <li>حافظ على تناسق الألوان في تطبيقك باستخدام لوحة ألوان متناسقة</li>
          <li>تأكد من أن الألوان تفي بمتطلبات الوصولية (نسبة التباين)</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;