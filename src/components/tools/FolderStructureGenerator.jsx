import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const FolderStructureGenerator = () => {
  const [structure, setStructure] = useState("");
  const [tree, setTree] = useState("");
  const [copied, setCopied] = useState(false);
  const [previewStructure, setPreviewStructure] = useState([]);

  const exampleStructure = `src/
  components/
    layout/
      Header.jsx
    tools/
      CodeFormatter.jsx
  pages/
    Home.jsx
  App.jsx
  main.jsx
index.css`;

  const parseStructure = () => {
    const lines = structure.split("\n").filter((line) => line.trim() !== "");
    let result = "";
    let treePreview = [];
    let pathStack = [];

    lines.forEach((line) => {
      const depth = (line.match(/^\s*/) || [""])[0].length / 2;
      const name = line.trim();
      pathStack = pathStack.slice(0, depth);
      pathStack[depth] = name;

      const currentPath = pathStack.join("/");
      const isFolder =
        name.endsWith("/") || (!name.includes(".") && !name.includes(" "));
      const icon = isFolder ? "📁 " : "📄 ";
      const indent = "  ".repeat(depth);
      result += `${indent}${icon}${name}\n`;
      treePreview.push({ path: currentPath, isFolder });
    });

    setTree(result);
    setPreviewStructure(treePreview);
    setCopied(false);
  };

  const createZipAndDownload = async () => {
    const zip = new JSZip();

    previewStructure.forEach((item) => {
      if (item.isFolder) {
        zip.folder(item.path);
      } else {
        zip.file(item.path, "");
      }
    });

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "folder-structure.zip");
  };

  const renderFolderPreview = () => {
    if (!previewStructure.length)
      return <p className="text-gray-500 dark:text-gray-300">لا توجد معاينة</p>;

    return (
      <ul className="font-mono text-sm text-gray-800 dark:text-gray-200">
        {previewStructure.map((item, idx) => {
          const depth = item.path.split("/").length - 1;
          const name = item.path.split("/").pop();
          const icon = item.isFolder ? "📁" : "📄";
          const indent = { paddingLeft: `${depth * 1.5}rem` };
          return (
            <li key={idx} style={indent}>
              {icon} {name}
            </li>
          );
        })}
      </ul>
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tree);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const loadExample = () => {
    setStructure(exampleStructure);
    setTimeout(() => parseStructure(), 100);
  };

  return (
    <div className="bg-form-light dark:bg-form-dark rounded-xl shadow-lg p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6 flex items-center">
        <span className="mr-2">📁</span> مولّد هيكل المجلدات والملفات
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* الإدخال */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-text-light dark:text-text-dark">
              أدخل هيكل المجلدات:
            </label>
            <button
              onClick={loadExample}
              className="text-sm px-3 py-1 bg-border-light dark:bg-border-dark text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-slate-700"
            >
              تحميل مثال
            </button>
          </div>
          <textarea
            value={structure}
            onChange={(e) => setStructure(e.target.value)}
            rows="12"
            className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-lg font-mono text-sm bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            placeholder={`مثال:\nsrc/\n  components/\n    layout/\n      Header.jsx\nApp.jsx`}
          />

          <button
            onClick={parseStructure}
            className="mt-3 px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500"
          >
            توليد الشجرة
          </button>
        </div>

        {/* المخرجات */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-text-light dark:text-text-dark">
              هيكل الشجرة:
            </label>
            {tree && (
              <button
                onClick={copyToClipboard}
                className={`px-3 py-1 text-sm rounded ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-border-light dark:bg-border-dark text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-slate-700"
                }`}
              >
                {copied ? "تم النسخ ✅" : "نسخ الشجرة"}
              </button>
            )}
          </div>
          <pre className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg border border-border-light dark:border-border-dark min-h-[250px] font-mono text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200">
            {tree || "ستظهر شجرة المجلدات هنا بعد التوليد..."}
          </pre>

          {/* المعاينة */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 mb-2">
              معاينة واقعية:
            </h3>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-border-light dark:border-border-dark max-h-64 overflow-y-auto">
              {renderFolderPreview()}
            </div>

            <button
              onClick={createZipAndDownload}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              تحميل كملفات .zip
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
        <h3 className="font-semibold text-yellow-800 dark:text-yellow-100 mb-2">
          تعليمات الاستخدام:
        </h3>
        <ul className="list-disc pl-5 text-yellow-700 dark:text-yellow-200 space-y-1 text-sm">
          <li>استخدم مسافتين لكل مستوى (2 spaces)</li>
          <li>أضف / في نهاية اسم المجلد</li>
          <li>الملفات يجب أن تحتوي على امتداد مثل .js أو .jsx أو .css</li>
        </ul>
      </div>
    </div>
  );
};

export default FolderStructureGenerator;
