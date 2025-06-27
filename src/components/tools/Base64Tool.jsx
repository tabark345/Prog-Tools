import React, { useState } from "react";

const Base64Tool = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("encode");

  const handleConvert = () => {
    try {
      if (mode === "encode") {
        setResult(btoa(text));
      } else {
        setResult(atob(text));
      }
    } catch (err) {
      setResult("❌ هناك خطأ في الإدخال!");
    }
  };

  return (
    <div className="bg-form-light dark:bg-form-dark rounded-xl shadow-lg p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark flex items-center">
        🔐 أداة Base64
      </h2>

      <div className="mb-4">
        <label className="block mb-1 text-text-light dark:text-text-dark font-medium">
          اختر الوضع:
        </label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="w-full p-2 border border-border-light dark:border-border-dark rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
        >
          <option value="encode">🔒 تشفير (Encode)</option>
          <option value="decode">🔓 فك التشفير (Decode)</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-text-light dark:text-text-dark font-medium">
          أدخل النص:
        </label>
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg font-mono text-sm bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
          placeholder="أدخل النص هنا..."
        />
      </div>

      <button
        onClick={handleConvert}
        className="w-full mt-3 px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500"
      >
        تنفيذ
      </button>

      {result && (
        <div className="mt-4">
          <label className="block mb-1 text-text-light dark:text-text-dark font-medium">
            النتيجة:
          </label>
          <pre className="bg-gray-100 dark:bg-slate-800 p-3 rounded-lg border border-border-light dark:border-border-dark font-mono text-sm break-words text-gray-800 dark:text-gray-100">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Base64Tool;
