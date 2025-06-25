// src/components/tools/RegexTester.jsx
import React, { useState } from "react";

const RegexTester = () => {
  const [pattern, setPattern] = useState("");
  const [text, setText] = useState("");
  const [matches, setMatches] = useState([]);

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, "g");
      const results = [...text.matchAll(regex)].map((m) => m[0]);
      setMatches(results);
    } catch (err) {
      setMatches(["❌ خطأ في النمط!"]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🧪 مختبر Regular Expression</h2>
      <input
        type="text"
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
        className="w-full p-2 mb-3 border rounded-lg"
        placeholder="أدخل النمط regex مثل: \d+"
      />
      <textarea
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 border rounded-lg font-mono text-sm"
        placeholder="أدخل النص لاختباره..."
      />
      <button
        onClick={testRegex}
        className="mt-3 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
      >
        اختبار
      </button>
      {matches.length > 0 && (
        <div className="mt-3">
          <h3 className="font-semibold mb-1">النتائج:</h3>
          <ul className="list-disc list-inside text-sm">
            {matches.map((match, idx) => (
              <li key={idx}>{match}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RegexTester;
