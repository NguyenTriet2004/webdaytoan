import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import logoImg from "../assets/images/logo.png";

interface HeaderProps {
  onNavClick: (section: string) => void;
  onOpenAuth: (mode: "login" | "register") => void;
  currentUser?: { name: string; email: string; phone: string } | null;
  onLogout?: () => void;
  onOpenTeacherDashboard?: () => void;
}

export default function Header({
  onNavClick,
  onOpenAuth,
  currentUser,
  onLogout,
  onOpenTeacherDashboard,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Trang chủ", id: "home" },
    { label: "Khóa học", id: "courses" },
    ...(currentUser ? [{ label: "Video bài giảng", id: "lectures" }] : []),
    { label: "Bài viết", id: "blogs" },
    { label: "Tài liệu", id: "documents" },
    { label: "Về thầy Nguyên", id: "about" },
  ];

  return (
    <header
      id="app-header"
      className="sticky top-0 z-50 bg-[#060913]/90 backdrop-blur-md border-b border-slate-800 text-white transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onNavClick("home")}
          >
            <div className="relative flex items-center justify-center w-11 h-11 p-0.5 overflow-hidden">
              <img
                src={logoImg}
                alt="KN Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-display leading-none mb-1">
                Nền tảng trực tuyến
              </span>
              <span className="block text-lg font-extrabold tracking-tight text-white leading-none font-display">
                TOÁN HỌC <span className="text-emerald-500">Thầy Nguyên</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className="text-slate-300 hover:text-white hover:underline decoration-emerald-500 decoration-2 underline-offset-8 transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer">
              <Search className="w-5 h-5" />
            </button>

            {/* Teacher Admin trigger link */}
            {currentUser?.email === "triet5509@gmail.com" &&
              onOpenTeacherDashboard && (
                <button
                  onClick={onOpenTeacherDashboard}
                  className="bg-gradient-to-r from-amber-650 to-yellow-600 hover:from-amber-600 hover:to-yellow-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md uppercase tracking-wider transition-all transform active:scale-95 cursor-pointer flex items-center space-x-1 border border-amber-500/25"
                >
                  <span>Góc Thầy Nguyên 🎖️</span>
                </button>
              )}

            {currentUser ? (
              <div className="flex items-center space-x-3 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-emerald-600/10 text-emerald-400 font-bold flex items-center justify-center text-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left">
                  <span className="block text-[11px] text-slate-400 leading-none font-mono">
                    Học viên
                  </span>
                  <span className="block text-xs font-bold text-white max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="text-[10px] text-slate-400 hover:text-red-400 font-bold border border-slate-800 hover:border-red-500/20 px-2.5 py-0.5 rounded transition-all cursor-pointer"
                  >
                    Thoát
                  </button>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth("login")}
                  className="text-slate-300 hover:text-white px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => onOpenAuth("register")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-emerald-600/25 transition-all duration-200 transform active:scale-95 cursor-pointer"
                >
                  Đăng ký
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button className="p-2 text-slate-400 hover:text-white">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0e1a] border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavClick(item.id);
                setIsOpen(false);
              }}
              className="block w-full text-left text-slate-300 hover:text-white py-2 text-base font-medium border-b border-slate-900"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 flex flex-col space-y-3 font-sans">
            {currentUser ? (
              <div className="text-center space-y-2 p-3 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="block text-xs font-bold text-slate-300 mb-1">
                  Đã đăng nhập: {currentUser.name}
                </span>
                {currentUser.email === "triet5509@gmail.com" &&
                  onOpenTeacherDashboard && (
                    <button
                      onClick={() => {
                        onOpenTeacherDashboard();
                        setIsOpen(false);
                      }}
                      className="w-full mb-1.5 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-xs text-white font-bold rounded-xl transition-all cursor-pointer uppercase tracking-wider block font-sans"
                    >
                      🎖️ Góc Thầy Nguyên
                    </button>
                  )}
                {onLogout && (
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="w-full py-2 bg-slate-800 hover:bg-red-500/10 text-xs text-red-400 font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Đăng xuất tài khoản
                  </button>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    onOpenAuth("login");
                    setIsOpen(false);
                  }}
                  className="w-full text-center text-slate-300 hover:text-white py-2 text-sm font-medium cursor-pointer"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => {
                    onOpenAuth("register");
                    setIsOpen(false);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-full font-semibold shadow-lg cursor-pointer"
                >
                  Đăng ký
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
