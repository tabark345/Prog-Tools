import React from "react";

const Sidebar = ({ tools, activeTool, setActiveTool, setShowSidebar }) => {
  return (
    <div className="lg:w-1/4 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 h-fit">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300 border-b pb-2">
        قائمة الأدوات
      </h2>
      <ul className="space-y-2">
        {tools.map((tool) => (
          <li key={tool.id}>
            <button
              onClick={() => {
                setActiveTool(tool.id);
                setShowSidebar(false);
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
              }}
              className={`w-full text-right flex items-center justify-start p-3 rounded-lg transition-all ${
                activeTool === tool.id
                  ? "bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-white font-semibold shadow-inner"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span className="text-xl ml-3">{tool.icon}</span>
              {tool.name}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
        <h3 className="font-semibold text-gray-700 dark:text-gray-100 mb-2">
          حول التطبيق
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          هذا التطبيق يوفر مجموعة من الأدوات المفيدة للمبرمجين لتسريع العمل
          وتحسين الإنتاجية.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
