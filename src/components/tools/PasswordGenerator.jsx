// src/components/tools/PasswordGenerator.jsx
import React, { useState } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(result);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔐 منشئ كلمات مرور</h2>
      <label className="block mb-2">الطول: {length} حرف</label>
      <input
        type="range"
        min="4"
        max="32"
        value={length}
        onChange={(e) => setLength(parseInt(e.target.value))}
        className="w-full mb-4"
      />
      <button
        onClick={generatePassword}
        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
      >
        توليد كلمة مرور
      </button>
      {password && (
        <pre className="mt-3 bg-gray-50 p-3 rounded-lg border font-mono text-sm">
          {password}
        </pre>
      )}
    </div>
  );
};

export default PasswordGenerator;
