import React, { useState, useEffect } from "react";

const UnitConverter = () => {
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [pixel, setPixel] = useState("");
  const [rem, setRem] = useState("");
  const [em, setEm] = useState("");

  useEffect(() => {
    if (pixel !== "") {
      setRem((pixel / baseFontSize).toFixed(4));
      setEm((pixel / baseFontSize).toFixed(4));
    } else if (rem !== "") {
      setPixel((rem * baseFontSize).toFixed(2));
      setEm(rem);
    } else if (em !== "") {
      setPixel((em * baseFontSize).toFixed(2));
      setRem(em);
    }
  }, [pixel, rem, em, baseFontSize]);

  const resetValues = () => {
    setPixel("");
    setRem("");
    setEm("");
  };

  return (
    <div className="bg-form-light dark:bg-form-dark rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6 flex items-center">
        <span className="mr-2">📏</span> محول الوحدات (Pixel ↔ Rem ↔ Em)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* الجانب الأيسر */}
        <div>
          <div className="mb-6">
            <label className="block text-text-light dark:text-text-dark mb-2">
              حجم الخط الأساسي (بالبكسل):
            </label>
            <div className="flex items-center">
              <input
                type="number"
                value={baseFontSize}
                onChange={(e) => setBaseFontSize(Number(e.target.value) || 16)}
                min="8"
                max="32"
                className="w-24 px-3 py-2 border border-border-light dark:border-border-dark rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark"
              />
              <span className="ml-2 text-text-light dark:text-text-dark">
                px
              </span>
            </div>
            <p className="text-sm text-text-light dark:text-text-dark mt-1">
              هذا هو حجم الخط الافتراضي للمتصفح (عادةً 16px)
            </p>
          </div>

          <div className="space-y-4 text-text-light dark:text-text-dark">
            {/* Pixel */}
            <div>
              <label className="block mb-2">بكسل (px):</label>
              <div className="flex">
                <input
                  type="number"
                  value={pixel}
                  onChange={(e) => setPixel(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border-light dark:border-border-dark rounded-l-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark"
                  placeholder="أدخل القيمة"
                />
                <span className="px-4 py-2 bg-form-light dark:bg-form-dark border border-l-0 border-border-light dark:border-border-dark rounded-r-lg text-text-light dark:text-text-dark">
                  px
                </span>
              </div>
            </div>

            {/* Rem */}
            <div>
              <label className="block mb-2">ريم (rem):</label>
              <div className="flex">
                <input
                  type="number"
                  value={rem}
                  onChange={(e) => setRem(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border-light dark:border-border-dark rounded-l-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark"
                  placeholder="أدخل القيمة"
                />
                <span className="px-4 py-2 bg-form-light dark:bg-form-dark border border-l-0 border-border-light dark:border-border-dark rounded-r-lg text-text-light dark:text-text-dark">
                  rem
                </span>
              </div>
            </div>

            {/* Em */}
            <div>
              <label className="block mb-2">إم (em):</label>
              <div className="flex">
                <input
                  type="number"
                  value={em}
                  onChange={(e) => setEm(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border-light dark:border-border-dark rounded-l-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark"
                  placeholder="أدخل القيمة"
                />
                <span className="px-4 py-2 bg-form-light dark:bg-form-dark border border-l-0 border-border-light dark:border-border-dark rounded-r-lg text-text-light dark:text-text-dark">
                  em
                </span>
              </div>
            </div>

            <button
              onClick={resetValues}
              className="px-4 py-2 bg-secondary-light dark:bg-secondary-dark text-white rounded-lg"
            >
              مسح الحقول
            </button>
          </div>
        </div>

        {/* الجانب الأيمن */}
        <div className="bg-bg-light dark:bg-bg-dark p-6 rounded-lg border border-border-light dark:border-border-dark text-text-light dark:text-text-dark">
          <h3 className="font-semibold text-lg mb-4">معلومات عن الوحدات:</h3>

          <div className="space-y-4">
            <div className="bg-form-light dark:bg-form-dark p-4 rounded-lg shadow-sm">
              <h4 className="font-medium mb-2">البكسل (px)</h4>
              <p className="text-sm">
                وحدة ثابتة تمثل نقطة واحدة على الشاشة. 1px = 1/96 من البوصة.
              </p>
            </div>

            <div className="bg-form-light dark:bg-form-dark p-4 rounded-lg shadow-sm">
              <h4 className="font-medium mb-2">الريم (rem)</h4>
              <p className="text-sm">
                وحدة نسبية تعتمد على حجم الخط الأساسي (root element). 1rem = حجم
                الخط الأساسي.
              </p>
            </div>

            <div className="bg-form-light dark:bg-form-dark p-4 rounded-lg shadow-sm">
              <h4 className="font-medium mb-2">الإم (em)</h4>
              <p className="text-sm">
                وحدة نسبية تعتمد على حجم الخط في العنصر الحالي. 1em = حجم الخط
                الحالي للعنصر.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary-light dark:bg-primary-dark rounded-lg">
            <h4 className="font-semibold mb-2">نصيحة:</h4>
            <p className="text-sm text-white">
              استخدم الوحدات النسبية (rem, em) لتصميمات تستجيب لأحجام الشاشات
              المختلفة، واستخدم البكسل للعناصر التي يجب أن تحافظ على حجم ثابت.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
