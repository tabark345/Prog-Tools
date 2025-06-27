import React, { useState } from "react";
import QRCode from "react-qr-code";

const QrCodeGenerator = () => {
  const [text, setText] = useState("");

  return (
    <div className="bg-form-light dark:bg-form-dark rounded-xl shadow-lg p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark flex items-center">
        📷 منشئ QR
      </h2>

      <label className="block mb-2 text-text-light dark:text-text-dark font-medium">
        أدخل نصًا أو رابطًا:
      </label>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
        placeholder="مثال: https://example.com أو Hello"
      />

      {text && (
        <div className="flex justify-center mt-6 bg-white dark:bg-slate-800 p-4 rounded-lg border border-border-light dark:border-border-dark">
          <QRCode value={text} size={200} />
        </div>
      )}
    </div>
  );
};

export default QrCodeGenerator;
