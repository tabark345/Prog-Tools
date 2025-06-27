import React, { useState } from "react";

const UuidGenerator = () => {
  const [uuid, setUuid] = useState("");

  const generateUuid = () => {
    const newUuid = crypto.randomUUID();
    setUuid(newUuid);
  };

  return (
    <div className="bg-form-light dark:bg-form-dark rounded-xl shadow-lg p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark flex items-center">
        🆔 منشئ UUID
      </h2>

      <button
        onClick={generateUuid}
        className="px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors"
      >
        توليد UUID
      </button>

      {uuid && (
        <pre className="mt-4 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 p-3 rounded-lg border border-border-light dark:border-border-dark font-mono text-sm break-all">
          {uuid}
        </pre>
      )}
    </div>
  );
};

export default UuidGenerator;
