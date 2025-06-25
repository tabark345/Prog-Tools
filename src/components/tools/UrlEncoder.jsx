// src/components/tools/UrlEncoder.jsx
import React, { useState } from "react";

const UrlEncoder = () => {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");

  const encodeText = () => {
    setEncoded(encodeURIComponent(text));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔗 مشفر URL</h2>
      <textarea
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 border rounded-lg font-mono text-sm"
        placeholder="أدخل النص هنا..."
      />
      <button
        onClick={encodeText}
        className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
      >
        تشفير
      </button>
      {encoded && (
        <pre className="mt-3 bg-gray-50 p-3 rounded-lg border font-mono text-sm">
          {encoded}
        </pre>
      )}
    </div>
  );
};

export default UrlEncoder;
