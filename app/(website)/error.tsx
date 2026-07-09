"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 可以在這裡把錯誤送到 Sentry 或其他日誌系統
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-5">
      <div className="bg-red-50 text-red-800 p-8 rounded-2xl shadow-sm text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">哎呀，發生了一些錯誤！</h2>
        <p className="text-red-600 mb-6">
          很抱歉，載入內容時遇到了問題。請稍後再試，或是返回首頁。
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            再試一次
          </button>
          <Link
            href="/"
            className="px-6 py-2 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            返回首頁
          </Link>
        </div>
      </div>
    </div>
  );
}
