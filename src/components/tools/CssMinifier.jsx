// src/components/tools/CssMinifier.jsx
import React, { useState } from "react";

const CssMinifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const minifyCss = () => {
    const minified = input
      .replace(/\s+/g, " ")
      .replace(/\s*{\s*/g, "{")
      .replace(/\s*}\s*/g, "}")
      .replace(/\s*:\s*/g, ":")
      .replace(/\s*;\s*/g, ";")
      .replace(/;\}/g, "}");
    setOutput(minified.trim());
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 ضاغط CSS</h2>
      <textarea
        rows={10}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 border rounded-lg font-mono text-sm"
        placeholder="أدخل كود CSS هنا..."
      />
      <button
        onClick={minifyCss}
        className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        ضغط الكود
      </button>
      {output && (
        <pre className="mt-3 bg-gray-50 p-3 rounded-lg border font-mono text-sm">
          {output}
        </pre>
      )}
    </div>
  );
};

export default CssMinifier;
