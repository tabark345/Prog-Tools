import React, { useState } from "react";

const RegexTester = () => {
  const [pattern, setPattern] = useState("");
  const [text, setText] = useState("");
  const [matches, setMatches] = useState([]);

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, "g");
      const results = [...text.matchAll(regex)].map((m) => m[0]);
      setMatches(results.length ? results : ["❌ لا توجد نتائج مطابقة"]);
    } catch (err) {
      setMatches(["❌ خطأ في النمط!"]);
    }
  };

  return (
    <div className="bg-form-light dark:bg-form-dark rounded-xl shadow-lg p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark flex items-center">
        🧪 مختبر Regular Expression
      </h2>

      <label className="block mb-1 text-text-light dark:text-text-dark font-medium">
        النمط (Regex):
      </label>
      <input
        type="text"
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
        className="w-full p-2 mb-4 border border-border-light dark:border-border-dark rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
        placeholder="مثال: \d+ أو \w{3,}"
      />

      <label className="block mb-1 text-text-light dark:text-text-dark font-medium">
        النص المطلوب اختباره:
      </label>
      <textarea
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 font-mono text-sm"
        placeholder="أدخل النص هنا..."
      />

      <button
        onClick={testRegex}
        className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
      >
        اختبار النمط
      </button>

      {matches.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
            النتائج:
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-200 space-y-1">
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
