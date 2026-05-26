import { Play, Users, Trophy, TrendingUp } from "lucide-react";
import bannerImg from "../assets/images/banner.jpg";
import avatarImg from "../assets/images/avarta.png";

interface HeroProps {
  onExploreCourses: () => void;
  onPlayIntro: () => void;
}

export default function Hero({ onExploreCourses, onPlayIntro }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative bg-[#060913] text-white overflow-hidden py-20 lg:py-28 border-b border-slate-800"
    >
      {/* Background Banner Image with blur and dark overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src={bannerImg}
          alt="Banner background"
          className="w-full h-full object-cover object-center opacity-40 filter blur-sm scale-102"
          referrerPolicy="no-referrer"
        />
        {/* Dark overlay gradients to ensure great contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060913]/90 via-[#060913]/75 to-[#060913]/60" />
      </div>

      {/* Dynamic Blackboard Math Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        {/* Math formulas scattered across the background */}
        <div className="absolute top-20 left-12 font-mono text-lg text-blue-400">
          a² + b² = c²
        </div>
        <div className="absolute top-48 left-1/4 font-mono text-sm text-indigo-400">
          f(x) = ∫₀ˣ t dt
        </div>
        <div className="absolute top-1/3 left-10 font-mono text-xs text-indigo-300 max-w-xs">
          x₁‚₂ = ⁻b ± √Δ / 2a <br />Δ = b² - 4ac
        </div>
        <div className="absolute bottom-20 left-20 font-mono text-lg text-blue-300">
          sin²θ + cos²θ = 1
        </div>
        <div className="absolute top-16 right-12 font-mono text-sm text-indigo-300">
          -b ± √b² - 2a
        </div>
        <div className="absolute top-40 right-1/4 font-mono text-xl text-blue-400">
          lim (x→∞) (1 + 1/n)ⁿ = e
        </div>
        <div className="absolute bottom-1/3 right-10 font-mono text-sm text-indigo-400">
          dy/dx = f&apos;(x)
        </div>
        {/* Geometric drawings */}
        <svg
          className="absolute top-12 left-[40%] w-48 h-48 text-blue-500 opacity-20"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="10"
            y1="50"
            x2="90"
            y2="50"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="50"
            y1="10"
            x2="50"
            y2="90"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M 50 10 L 84.6 70 L 15.4 70 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
        <svg
          className="absolute bottom-16 right-[35%] w-64 h-64 text-indigo-500 opacity-20"
          viewBox="0 0 120 120"
        >
          <rect
            x="20"
            y="20"
            width="80"
            height="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="20"
            y1="20"
            x2="100"
            y2="100"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
          <circle
            cx="60"
            cy="60"
            r="56.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="3,3"
          />
        </svg>
      </div>

      {/* Decorative radial gradients for glowing effect */}
      <div className="absolute -top-40 right-10 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-12 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 z-10">
            {/* Tag capsule */}
            <div className="inline-flex items-center self-start bg-slate-800/80 border border-slate-700/60 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 tracking-wide font-display">
              <span className="mr-1.5">🚀</span> NỀN TẢNG HỌC TOÁN ONLINE HÀNG
              ĐẦU VIỆT NAM
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-white leading-[1.1] font-display">
              Học Toán tư duy <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-indigo-500 bg-clip-text text-transparent">
                vững vàng, bứt phá
              </span>{" "}
              <br />
              tương lai
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Cung cấp lộ trình học Toán bài bản từ lớp 9 đến THPT và luyện thi
              VSAT. Bài giảng dễ hiểu, tài liệu chất lượng, đồng hành cùng bạn
              chinh phục mọi kỳ thi.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreCourses}
                className="group flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 w-full sm:w-auto cursor-pointer"
              >
                Khám phá khóa học
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
              <button
                onClick={onPlayIntro}
                className="flex items-center justify-center space-x-3 text-slate-200 hover:text-white font-bold bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700 hover:border-slate-500 px-8 py-4 rounded-full transition-all duration-200 w-full sm:w-auto cursor-pointer"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full border border-current">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </span>
                <span>Xem giới thiệu</span>
              </button>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 self-stretch">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold font-display">
                    10.000+
                  </div>
                  <div className="text-xs text-slate-400 font-sans">
                    Học sinh tin học
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold font-display">
                    500+
                  </div>
                  <div className="text-xs text-slate-400 font-sans">
                    Bài giảng đặc sắc
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold font-display">
                    98%
                  </div>
                  <div className="text-xs text-slate-400 font-sans">
                    Đạt đỗ nguyện vọng
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Column - Teacher Presentation */}
          <div className="lg:col-span-5 relative flex flex-col justify-center items-center z-10 select-none">
            {/* Visual glow on portrait backplate */}
            <div className="absolute inset-x-0 top-0 bg-blue-500/10 rounded-full blur-3xl -z-10 w-96 h-96 mx-auto" />

            {/* Teacher Image Framed Container */}
            <div className="relative group max-w-sm sm:max-w-lg w-full flex flex-col items-center">
              {/* Teacher Image (Transparent) */}
              <div className="relative w-full h-[500px] sm:h-[560px] flex items-end justify-center overflow-hidden">
                <img
                  src={avatarImg}
                  alt="Thầy Nguyên - Giáo viên dạy toán"
                  className="max-h-full max-w-full object-contain filter contrast-105 brightness-[1.03] transition-all duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Info Overlay Card */}
              <div className="w-full bg-[#0b0f1a]/95 border border-slate-800 p-5 rounded-2xl shadow-xl shadow-blue-950/10 backdrop-blur-md -mt-4 z-20">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold tracking-tight text-white font-display">
                    Thầy Nguyên
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                    Chuyên Toán
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                    8+ năm kinh nghiệm ôn luyện chuyên Toán lớp 9-12
                  </li>
                  <li className="flex items-center font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                    Giáo viên ôn luyện kỳ thi VSAT và Đánh giá năng lực hàng đầu
                  </li>
                </ul>
                <div className="mt-3 pt-2.5 border-t border-slate-800/85 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">
                    Tâm huyết - Tận tụy - Vững vàng
                  </span>
                  <span className="font-display font-extrabold text-lg text-blue-400 tracking-wider">
                    Thầy Nguyên
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
