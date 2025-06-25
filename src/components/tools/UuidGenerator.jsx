// src/components/tools/UuidGenerator.jsx
import React, { useState } from "react";

const UuidGenerator = () => {
  const [uuid, setUuid] = useState("");

  const generateUuid = () => {
    const newUuid = crypto.randomUUID();
    setUuid(newUuid);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🆔 منشئ UUID</h2>
      <button
        onClick={generateUuid}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        توليد UUID
      </button>
      {uuid && (
        <pre className="mt-3 bg-gray-50 p-3 rounded-lg border font-mono text-sm">
          {uuid}
        </pre>
      )}
    </div>
  );
};

export default UuidGenerator;
