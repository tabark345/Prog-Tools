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
    <div className="bg-form-light dark:bg-form-dark rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-text-light dark:text-text-dark">
        🔁 Text Transformer
      </h2>

      <textarea
        className="w-full p-3 border rounded mb-4 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark"
        rows="6"
        placeholder="أدخل النص هنا..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={toLowerCase}
          className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark text-white"
        >
          lowercase
        </button>
        <button
          onClick={toUpperCase}
          className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark text-white"
        >
          UPPERCASE
        </button>
        <button
          onClick={toSnakeCase}
          className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark text-white"
        >
          snake_case
        </button>
        <button
          onClick={toCamelCase}
          className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark text-white"
        >
          camelCase
        </button>
        <button
          onClick={removeWhitespaces}
          className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark text-white"
        >
          🧹 إزالة الفراغات
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark"
          placeholder="أدخل الرموز المراد حذفها مثل: !@#"
          value={customSymbols}
          onChange={(e) => setCustomSymbols(e.target.value)}
        />
        <button
          onClick={removeCustomSymbols}
          className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark text-white"
        >
          ❌ حذف الرموز
        </button>
      </div>

      <h3 className="font-semibold mb-2 text-text-light dark:text-text-dark">
        🔽 النتيجة:
      </h3>
      <textarea
        className="w-full p-3 border rounded bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark"
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
