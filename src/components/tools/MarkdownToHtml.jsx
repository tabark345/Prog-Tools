// src/components/tools/MarkdownToHtml.jsx
import React, { useState } from "react";
import { marked } from "marked";

const MarkdownToHtml = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  const convertToHtml = () => {
    setHtml(marked.parse(markdown));
  };

  return (
    <div className="bg-form-white dark:bg-form-dark rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📝 تحويل Markdown إلى HTML</h2>
      <textarea
        rows={8}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        className="w-full p-3 border rounded-lg font-mono text-sm text-text-light dark:text-text-dark bg-form-light dark:bg-form-dark"
        placeholder="أدخل كود Markdown هنا..."
      />
      <button
        onClick={convertToHtml}
        className="mt-3 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
      >
        تحويل
      </button>
      {html && (
        <div
          className="mt-3 p-3 border rounded-lg bg-gray-50"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
};

export default MarkdownToHtml;
