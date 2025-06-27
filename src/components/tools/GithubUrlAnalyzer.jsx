// src/components/tools/GithubUrlAnalyzer.jsx
import React, { useState } from "react";

const GithubUrlAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  const analyzeUrl = () => {
    setError("");
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname !== "github.com") {
        throw new Error("الرابط يجب أن يكون من github.com");
      }

      const pathParts = parsedUrl.pathname
        .split("/")
        .filter((part) => part !== "");
      if (pathParts.length < 2) {
        throw new Error(
          "رابط غير صالح. مثال صحيح: https://github.com/username/repo"
        );
      }

      const [owner, repo, ...rest] = pathParts;
      let type = "مستودع";
      let details = "";

      if (rest.length > 0) {
        if (rest[0] === "issues") {
          type = "مشكلة";
          if (rest[1]) details = `رقم المشكلة: ${rest[1]}`;
        } else if (rest[0] === "pull") {
          type = "طلب دمج";
          if (rest[1]) details = `رقم الطلب: ${rest[1]}`;
        } else if (rest[0] === "tree") {
          type = "فرع";
          if (rest[1]) details = `اسم الفرع: ${rest[1]}`;
        } else if (rest[0] === "blob") {
          type = "ملف";
          if (rest[1]) details = `الفرع: ${rest[1]}`;
          if (rest[2]) details += ` | المسار: ${rest.slice(2).join("/")}`;
        } else if (rest[0] === "releases") {
          type = "الإصدارات";
        }
      }

      setAnalysis({ owner, repo, type, details, fullUrl: url });
    } catch (err) {
      setError(err.message);
      setAnalysis(null);
    }
  };

  const resetForm = () => {
    setUrl("");
    setAnalysis(null);
    setError("");
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <span className="mr-2">🐙</span> محلل روابط GitHub
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            أدخل رابط GitHub:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="مثال: https://github.com/username/repository"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            />
            <button
              onClick={analyzeUrl}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              تحليل
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600"
            >
              مسح
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg border border-red-200 dark:border-red-600">
            <strong>خطأ:</strong> {error}
          </div>
        )}

        {analysis && (
          <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-lg border border-gray-200 dark:border-zinc-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              نتيجة التحليل:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-500 dark:text-gray-400">
                  المالك:
                </h4>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {analysis.owner}
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-500 dark:text-gray-400">
                  المستودع:
                </h4>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {analysis.repo}
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-500 dark:text-gray-400">
                  النوع:
                </h4>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {analysis.type}
                </p>
              </div>

              {analysis.details && (
                <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-500 dark:text-gray-400">
                    التفاصيل:
                  </h4>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {analysis.details}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <a
                href={analysis.fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-zinc-600"
              >
                زيارة الرابط
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            </div>
          </div>
        )}

        <div className="bg-indigo-50 dark:bg-zinc-800 p-4 rounded-lg">
          <h3 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-2">
            أنواع الروابط المدعومة:
          </h3>
          <ul className="list-disc pl-5 text-indigo-700 dark:text-indigo-400 space-y-1">
            <li>روابط المستودعات (https://github.com/username/repo)</li>
            <li>
              روابط المشكلات (https://github.com/username/repo/issues/123)
            </li>
            <li>
              روابط طلبات الدمج (https://github.com/username/repo/pull/456)
            </li>
            <li>
              روابط الفروع (https://github.com/username/repo/tree/branch-name)
            </li>
            <li>
              روابط الملفات
              (https://github.com/username/repo/blob/branch-name/path/to/file)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GithubUrlAnalyzer;
