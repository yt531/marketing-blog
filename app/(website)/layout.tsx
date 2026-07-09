import Navbar from "@/components/Navbar";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* 主要內容區 */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-navbar text-center py-10 text-gray-600 text-sm mt-20 border-t border-orange-100/20">
        <div className="max-w-4xl mx-auto px-4">
          <p className="mb-2">
            © {new Date().getFullYear()} Jeff's Blog
          </p>
          <p className="text-xs text-gray-700">Brewed with ❤️ and Data</p>
        </div>
      </footer>
    </>
  );
}
