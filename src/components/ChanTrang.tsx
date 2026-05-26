import { Facebook, Youtube, Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import logoImg from "../assets/images/logo.png";

interface FooterProps {
  onNavClick: (section: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="bg-[#04060f] text-slate-400 pt-16 pb-8 border-t border-slate-900 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footprint Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-slate-900">
          {/* Main Info Column (4 span) */}
          <div className="md:col-span-4 space-y-5">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => onNavClick("home")}
            >
              <div className="flex items-center justify-center w-9 h-9 p-0.5 overflow-hidden">
                <img
                  src={logoImg}
                  alt="KN Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="block text-base font-extrabold text-white tracking-tight font-display">
                TOÁN HỌC <span className="text-emerald-500">Thầy Nguyên</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-xs font-medium">
              Nền tảng học Toán online chất lượng cao đồng hành cùng học sinh
              chinh phục mọi kỳ thi tuyển sinh và đánh giá năng lực toàn quốc.
            </p>

            {/* Social channels */}
            <div className="flex items-center space-x-3.5 pt-1">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-emerald-600 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-red-650 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
              {/* Custom TikTok pure SVG indicator */}
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.14a7.27 7.27 0 0 0 3.86 2.12v3.9c-1.39-.04-2.79-.47-3.95-1.27-.12-.08-.21-.19-.34-.27-.03.54-.01 1.07-.01 1.61 0 2.44-.39 4.85-1.63 6.96a9.58 9.58 0 0 1-5.18 4.3c-2.31.78-4.82.74-7.09-.13a9.7 9.7 0 0 1-5.06-4.9A10.3 10.3 0 0 1 0 11.23a10.02 10.02 0 0 1 4.58-8.47 10.3 10.3 0 0 1 7.9-1.09c.03.49.02.98.02 1.47-1.39-.41-2.9.01-3.95.97a5.55 5.55 0 0 0-1.89 3.7c-.24 1.83.5 3.7 1.88 4.93a5.73 5.73 0 0 0 6.64.65c1.4-.85 2.22-2.42 2.23-4.04V.02z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Academic Paths (2 span) */}
          <div className="md:col-span-2 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              HỌC TẬP
            </h5>
            <ul className="space-y-2 text-xs font-medium text-slate-450">
              <li>
                <button
                  onClick={() => onNavClick("courses")}
                  className="hover:text-emerald-500 hover:underline cursor-pointer"
                >
                  Khóa học lớp 9
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick("courses")}
                  className="hover:text-emerald-500 hover:underline cursor-pointer"
                >
                  Khóa học THPT
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick("courses")}
                  className="hover:text-emerald-500 hover:underline cursor-pointer"
                >
                  Luyện thi VSAT
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick("documents")}
                  className="hover:text-emerald-500 hover:underline cursor-pointer"
                >
                  Tài liệu học tập
                </button>
              </li>
            </ul>
          </div>

          {/* Supports List (3 span) */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              HỖ TRỢ
            </h5>
            <ul className="space-y-2 text-xs font-medium text-slate-450">
              <li>
                <a href="#" className="hover:text-emerald-500 hover:underline">
                  Hướng dẫn học tập
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 hover:underline">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 hover:underline">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 hover:underline">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts info matching screenshot (3 span) */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              LIÊN HỆ
            </h5>
            <ul className="space-y-2 text-xs font-medium text-slate-450">
              <li className="flex items-start">
                <Mail className="w-4 h-4 mr-2.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="break-all select-all">
                  info@toanhocthaynguyen.vn
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2.5 text-emerald-500 flex-shrink-0" />
                <span className="select-all">0945 538 554</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Địa chỉ: Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom rights and BackToTop anchor */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-slate-500">
          <span>
            &copy; {new Date().getFullYear()} Toán Học Thầy Nguyên. All rights
            reserved.
          </span>

          <button
            onClick={handleScrollToTop}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
            title="Cuộn lên đầu trang"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
