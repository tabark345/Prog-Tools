// src/components/tools/TextTransformer.jsx
import React, { useState } from "react";

const TextTransformer = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [customSymbols, setCustomSymbols] = useState("");

  const toLowerCase = () => setOutput(input.toLowerCase());
  const toUpperCase = () => setOutput(input.toUpperCase());

  const toSnakeCase = () => {
    const result = input
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .replace(/\s+/g, "_")
      .toLowerCase();
    setOutput(result);
  };

  const toCamelCase = () => {
    const result = input
      .toLowerCase()
      .replace(/[_\-\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
    setOutput(result);
  };

  const removeWhitespaces = () => {
    setOutput(input.replace(/\s+/g, ""));
  };

  const removeCustomSymbols = () => {
    const regex = new RegExp(`[${customSymbols}]`, "g");
    setOutput(input.replace(regex, ""));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">
        🔁 Text Transformer
      </h2>

      <textarea
        className="w-full p-3 border border-gray-300 rounded mb-4"
        rows="6"
        placeholder="أدخل النص هنا..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={toLowerCase} className="btn">
          lowercase
        </button>
        <button onClick={toUpperCase} className="btn">
          UPPERCASE
        </button>
        <button onClick={toSnakeCase} className="btn">
          snake_case
        </button>
        <button onClick={toCamelCase} className="btn">
          camelCase
        </button>
        <button onClick={removeWhitespaces} className="btn">
          🧹 إزالة الفراغات
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="أدخل الرموز المراد حذفها مثل: !@#"
          value={customSymbols}
          onChange={(e) => setCustomSymbols(e.target.value)}
        />
        <button onClick={removeCustomSymbols} className="btn">
          ❌ حذف الرموز
        </button>
      </div>

      <h3 className="font-semibold text-indigo-700 mb-2">🔽 النتيجة:</h3>
      <textarea
        className="w-full p-3 border border-gray-300 rounded"
        rows="6"
        value={output}
        readOnly
      ></textarea>
    </div>
  );
};

export default TextTransformer;

// ملاحظة: يمكنك إضافة المزيد من الأزرار للتحويلات المتقدمة لاحقًا
// وتأكد من أن الكلاس "btn" لديك معرف في Tailwind ليشمل ألوان وزر أنيق
