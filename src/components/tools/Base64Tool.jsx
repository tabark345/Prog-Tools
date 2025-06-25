// src/components/tools/Base64Tool.jsx
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔐 أداة Base64</h2>
      <div className="mb-3">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="encode">تشفير (Encode)</option>
          <option value="decode">فك التشفير (Decode)</option>
        </select>
      </div>
      <textarea
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 border rounded-lg font-mono text-sm"
        placeholder="أدخل النص هنا..."
      />
      <button
        onClick={handleConvert}
        className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
      >
        تنفيذ
      </button>
      {result && (
        <pre className="mt-3 bg-gray-50 p-3 rounded-lg border font-mono text-sm break-all">
          {result}
        </pre>
      )}
    </div>
  );
};

export default Base64Tool;
