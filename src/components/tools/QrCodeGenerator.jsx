// src/components/tools/QrCodeGenerator.jsx
import React, { useState } from "react";
import  QRCode  from "react-qr-code";

const QrCodeGenerator = () => {
  const [text, setText] = useState("");

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📷 منشئ QR</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 border rounded-lg mb-3"
        placeholder="أدخل نص أو رابط..."
      />
      {text && (
        <div className="flex justify-center mt-4">
          <QRCode value={text} size={200} />
        </div>
      )}
    </div>
  );
};

export default QrCodeGenerator;
