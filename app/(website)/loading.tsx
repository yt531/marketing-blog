export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-12 w-full">
      {/* 模擬標題骨架 */}
      <div className="h-10 md:h-14 bg-gray-200 rounded-lg w-48 mx-auto mb-12 animate-pulse"></div>

      {/* 模擬文章卡片骨架 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full"
          >
            {/* 圖片區域骨架 */}
            <div className="w-full h-56 bg-gray-200 animate-pulse"></div>

            {/* 內容區域骨架 */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-6 animate-pulse"></div>

              {/* 底部骨架 */}
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
