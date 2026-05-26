import { GraduationCap, ArrowRight } from 'lucide-react';

interface CTABannerProps {
  onRegisterNow: () => void;
}

export default function CTABanner({ onRegisterNow }: CTABannerProps) {
  return (
    <section id="cta-banner" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-[28px] p-8 sm:p-10 shadow-xl shadow-blue-600/15 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-left">
          
          {/* Radial visual glows */}
          <div className="absolute top-[-50%] right-[-10%] w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          
          <div className="flex items-center space-x-5 relative z-10">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white hidden sm:flex">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div className="space-y-1.5 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display text-white">
                Sẵn sàng bắt đầu hành trình chinh phục Toán học?
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm font-sans font-medium">
                Tham gia ngay cùng hàng ngàn học sinh đã bứt phá điểm số và đỗ đạt nguyện vọng cùng Thầy Nguyên.
              </p>
            </div>
          </div>

          <button
            onClick={onRegisterNow}
            className="group flex-shrink-0 flex items-center justify-center space-x-2 bg-white hover:bg-blue-50 text-blue-700 font-bold px-8 py-4 rounded-2xl shadow-md hover:shadow-xl transform active:scale-95 transition-all text-sm uppercase tracking-wide cursor-pointer relative z-10 w-full md:w-auto font-sans"
          >
            <span>Đăng ký ngay</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
