// src/components/tools/LanguageFixer.jsx
import React, { useState } from "react";

const enToAr = {
  // أحرف
  q: "ض",
  w: "ص",
  e: "ث",
  r: "ق",
  t: "ف",
  y: "غ",
  u: "ع",
  i: "ه",
  o: "خ",
  p: "ح",
  a: "ش",
  s: "س",
  d: "ي",
  f: "ب",
  g: "ل",
  h: "ا",
  j: "ت",
  k: "ن",
  l: "م",
  z: "ئ",
  x: "ء",
  c: "ؤ",
  v: "ر",
  b: "لا",
  n: "ى",
  m: "ة",
  "[": "ج",
  "]": "د",
  ";": "ك",
  "'": "ط",
  ",": "و",
  ".": "ز",
  "/": "ظ",
  "`": "ذ",
  "~": "ّ",
  1: "١",
  2: "٢",
  3: "٣",
  4: "٤",
  5: "٥",
  6: "٦",
  7: "٧",
  8: "٨",
  9: "٩",
  0: "٠",
  "!": "!",
  "@": "@",
  "#": "#",
  $: "٬",
  "%": "٪",
  "^": "‘",
  "&": "÷",
  "*": "×",
  "(": ")",
  ")": "(",
  _: "_",
  "+": "+",
  ":": ":",
  '"': '"',
  "<": "،",
  ">": ".",
  "?": "؟",
};

const arToEn = Object.fromEntries(
  Object.entries(enToAr).map(([en, ar]) => [ar, en])
);

const convertText = (text, toArabic = true) => {
  const map = toArabic ? enToAr : arToEn;
  return text
    .split("")
    .map((char) => map[char] || map[char.toLowerCase()] || char)
    .join("");
};

const LanguageFixer = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [toArabic, setToArabic] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    setOutput(convertText(input, toArabic));
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("فشل النسخ:", err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">
        🌐 أداة تصحيح خطأ اللغة
      </h2>

      <textarea
        rows="4"
        className="w-full p-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        placeholder="الصق أو اكتب نصًا بلغتك الخاطئة"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex items-center justify-between mt-4">
        <label className="text-sm dark:text-gray-300">
          <input
            type="checkbox"
            checked={toArabic}
            onChange={() => setToArabic(!toArabic)}
            className="mr-2"
          />
          التحويل إلى العربية
        </label>

        <button
          onClick={handleConvert}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
        >
          تحويل النص
        </button>
      </div>

      {output && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border dark:border-gray-600 relative">
          <p className="text-sm text-gray-700 dark:text-gray-200 font-semibold">
            🔄 النص بعد التحويل:
          </p>
          <p className="mt-2 text-gray-900 dark:text-white break-words whitespace-pre-wrap">
            {output}
          </p>

          <div className="flex justify-end mt-2">
            <button
              onClick={handleCopy}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
            >
              {copied ? "✅ تم النسخ" : "📋 نسخ النص"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageFixer;
