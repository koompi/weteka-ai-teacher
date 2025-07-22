"use client";

import React, { useState } from "react";
import { HelpCircle, X } from "lucide-react";

interface HelpMenuProps {
  isVisible?: boolean;
}

const HelpMenu: React.FC<HelpMenuProps> = ({ isVisible = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  const helpItems = [
    {
      title: "សួរសំណួរ",
      description: "អ្នកអាចសួរសំណួរអំពីមុខវិជ្ជាណាមួយ ដូចជាគណិតវិទ្យា វិទ្យាសាស្រ្ត ឬភាសា",
      example: "ឧទាហរណ៍: \"ពន្យល់ខ្ញុំអំពីប្រភេទត្រីកោណ\""
    },
    {
      title: "សុំជំនួយសរសេរឯកសារ",
      description: "ស្នើសុំជំនួយក្នុងការសរសេររបាយការណ៍ សំបុត្រ ឬឯកសារផ្សេងៗ",
      example: "ឧទាហរណ៍: \"ជួយខ្ញុំសរសេរសំបុត្រស្នើសុំការងារ\""
    },
    {
      title: "ស្វែងរកព័ត៌មាន",
      description: "សួរអំពីព្រឹត្តិការណ៍ វប្បធម៌ ឬចំណេះដឹងទូទៅ",
      example: "ឧទាហរណ៍: \"ប្រាប់ខ្ញុំអំពីប្រវត្តិសាស្រ្តកម្ពុជា\""
    },
    {
      title: "ដោះស្រាយបញ្ហា",
      description: "ស្វែងរកដំណោះស្រាយសម្រាប់បញ្ហាបច្ចេកទេស ឬការងារ",
      example: "ឧទាហរណ៍: \"របៀបដោះស្រាយបញ្ហាកុំព្យូទ័រ\""
    },
    {
      title: "បកប្រែភាសា",
      description: "ស្នើសុំការបកប្រែពីភាសាខ្មែរទៅអង់គ្លេស ឬផ្ទុយមកវិញ",
      example: "ឧទាហរណ៍: \"បកប្រែ'សួស្តី' ជាភាសាអង់គ្លេស\""
    },
    {
      title: "ពន្យល់គោលគំនិត",
      description: "ស្នើសុំការពន្យល់អំពីគោលគំនិតស្មុគស្មាញឱ្យកាន់តែងាយយល់",
      example: "ឧទាហរណ៍: \"ពន្យល់ខ្ញុំអំពីបច្ចេកវិទ្យា AI\""
    }
  ];

  if (!isVisible) return null;

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-50 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        title="How to use"
      >
        <HelpCircle className="w-5 h-5" />
      </button>

      {/* Help Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  របៀបប្រើប្រាស់ Weteka AI
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-white">🤖</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Weteka AI ជំនួយការ អាចជួយអ្នកក្នុងការរៀន ការងារ និងកិច្ចការផ្សេងៗជាច្រើន
                </p>
              </div>

              {/* Help Items */}
              <div className="space-y-4">
                {helpItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs mb-3 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <p className="text-xs text-blue-600 font-medium">
                        {item.example}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Best Practices */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h3 className="font-semibold text-green-900 mb-3 text-sm">
                  🎯 របៀបទទួលបានលទ្ធផលល្អបំផុត
                </h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-green-100">
                    <h4 className="font-medium text-green-800 text-xs mb-1">១. សួរសំណួរច្បាស់លាស់</h4>
                    <p className="text-xs text-green-700">ផ្តល់ព័ត៌មានលម្អិត និងបរិបទច្បាស់លាស់</p>
                    <div className="mt-2 text-xs">
                      <span className="text-red-600">❌ មិនល្អ:</span> <span className="text-gray-600">"ជួយខ្ញុំសរសេរ"</span><br/>
                      <span className="text-green-600">✅ ល្អ:</span> <span className="text-gray-600">"ជួយខ្ញុំសរសេរសំបុត្រស្នើសុំការងារមុខតំណែងគ្រូបង្រៀនគណិតវិទ្យា"</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-green-100">
                    <h4 className="font-medium text-green-800 text-xs mb-1">២. ផ្តល់បរិបទ និងឧទាហរណ៍</h4>
                    <p className="text-xs text-green-700">បញ្ជាក់អំពីគោលដៅ ក្រុមទាំងគន្លង និងតម្រូវការពិសេស</p>
                    <div className="mt-2 text-xs">
                      <span className="text-green-600">✅ ឧទាហរណ៍:</span> <span className="text-gray-600">"សរសេរសំបុត្រផ្លូវការជូនដល់ក្រសួងអប់រំ ស្នើសុំការឯកភាពកែតម្រូវកម្មវិធីសិក្សា សម្រាប់សាលាបឋមសិក្សា"</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-green-100">
                    <h4 className="font-medium text-green-800 text-xs mb-1">៣. បែងចែកសំណួរធំជាសំណួរតូច</h4>
                    <p className="text-xs text-green-700">សួរមួយបញ្ហាក្នុងមួយពេល ដើម្បីទទួលបានចម្លើយលម្អិត</p>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-green-100">
                    <h4 className="font-medium text-green-800 text-xs mb-1">៤. ប្រើភាសាខ្មែរជាចម្បង</h4>
                    <p className="text-xs text-green-700">Weteka AI យល់ភាសាខ្មែរបានល្អ និងអាចផ្តល់ចម្លើយសមស្រប</p>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-green-100">
                    <h4 className="font-medium text-green-800 text-xs mb-1">៥. សួរសំណួរបន្ថែម</h4>
                    <p className="text-xs text-green-700">កុំស្ទាក់ស្ទើរសួរសំណួរបន្ថែម ឬស្នើសុំការពន្យល់បន្ថែម</p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-semibold text-blue-900 mb-2 text-sm">
                  ជំនួយបន្ថែម
                </h3>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• ចុច Enter ដើម្បីផ្ញើសាររបស់អ្នក</li>
                  <li>• ចុច Shift+Enter ដើម្បីបន្តបន្ទាត់ថ្មី</li>
                  <li>• អ្នកអាចកែសម្រួលចម្លើយរបស់ AI បាន</li>
                  <li>• ចុចលើប្រអប់ចម្លើយដើម្បីចម្លង ឬចែករំលែក</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpMenu;