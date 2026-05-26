import { CheckCircle2, QrCode, Shield, Zap } from 'lucide-react';
import { useState } from 'react';

interface MoMoPaymentProps {
  onInitiatePayment: () => void;
}

export default function MoMoPayment({ onInitiatePayment }: MoMoPaymentProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyBankAccount = () => {
    navigator.clipboard.writeText('0945538554');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="momo-payment-section" className="py-20 bg-[#090b16] text-white overflow-hidden relative border-b border-slate-900">
      
      {/* Radiant Glow overlays */}
      <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] rounded-full bg-[#d21d78]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-emerald-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="inline-flex items-center bg-[#d21d78]/15 border border-[#d21d78]/30 px-4.5 py-1.5 rounded-full text-xs font-bold text-[#f25fa1] tracking-wide font-display uppercase">
              🚀 THANH TOÁN DỄ DÀNG
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-tight font-display">
                Thanh toán nhanh chóng, <br />
                an toàn với MoMo
              </h2>
              <p className="text-slate-300 text-base max-w-lg leading-relaxed font-sans font-medium">
                Chỉ với vài thao tác quét mã QR đơn giản trên điện thoại, bạn đã có thể mở khóa kích hoạt ngay tài khoản học tập và sở hữu trọn đời khóa học yêu thích.
              </p>
            </div>

            {/* Checkpoints */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d21d78] to-pink-500 flex items-center justify-center text-white shadow-lg shadow-[#d21d78]/25 group-hover:scale-105 transition-transform select-none">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#f1f3f9] text-base font-display">Thanh toán nhanh chóng, tiện lợi</h4>
                  <p className="text-xs text-slate-400">Tự động kích hoạt khóa học của bạn chỉ sau vài giây khớp tiền.</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-transform select-none">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#f1f3f9] text-base font-display">Bảo mật tuyệt đối, an tâm học tập</h4>
                  <p className="text-xs text-slate-400">Mã hóa giao dịch tiêu chuẩn an toàn bảo mật mã hóa SSL.</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-transform select-none">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#f1f3f9] text-base font-display">Xác nhận giao dịch tự động 24/7</h4>
                  <p className="text-xs text-slate-400 font-sans">Hệ thống xử lý webhook khớp tiền ngay lập tức không cần chờ đợi.</p>
                </div>
              </div>
            </div>

            {/* Manual MoMo account transfer */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 max-w-lg">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-display">Thông tin chuyển khoản di động</span>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-300 font-sans">Chuyển khoản SĐT: <span className="text-white font-bold">0945 538 554</span></div>
                  <div className="text-xs text-slate-400 font-sans mt-0.5">Tên người nhận: <span className="text-white font-bold">NGUYỄN KHOA NGUYÊN</span></div>
                </div>
                <button
                  onClick={handleCopyBankAccount}
                  className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 active:scale-95 text-xs font-semibold rounded-lg text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  {copied ? 'Đã sao chép' : 'Sao chép SĐT'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Mockup Column */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-center gap-6 select-none">
            
            {/* Phone Frame Mockup */}
            <div className="w-[260px] h-[520px] bg-slate-950 border-[6px] border-slate-800 rounded-[38px] shadow-2xl relative overflow-hidden flex flex-col justify-between p-3.5 transform hover:rotate-1 hover:scale-101 transition-all duration-300">
              
              {/* Phone speaker */}
              <div className="absolute top-0 inset-x-0 mx-auto w-24 h-4 bg-slate-800 rounded-b-xl flex items-center justify-center z-10">
                <div className="w-6 h-1 bg-slate-700 rounded-full" />
              </div>

              {/* Simulated Screen */}
              <div className="pt-6 text-center space-y-1.5">
                <div className="w-9 h-9 bg-[#d21d78] rounded-xl flex items-center justify-center mx-auto text-white font-extrabold text-sm shadow-[#d21d7c]/45 shadow-md">
                  Mo
                </div>
                <div>
                  <h5 className="text-[11px] font-semibold text-slate-400 font-sans leading-none">Thanh toán an toàn</h5>
                  <span className="text-[13px] font-extrabold text-white font-display mt-0.5">với Ví MoMo</span>
                </div>
              </div>

              {/* Receipt info card */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3.5 my-auto text-left">
                <div className="text-center pb-2.5 border-b border-slate-800">
                  <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">Tổng hóa đơn</span>
                  <div className="text-xl font-extrabold text-white font-display mt-0.5">1.200.000 đ</div>
                </div>

                <div className="space-y-1 text-[10px] text-slate-350 font-sans">
                  <div className="flex justify-between">
                    <span>Nhà cung cấp</span>
                    <span className="text-white font-bold leading-none">Toán Học Thầy Nguyên</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dịch vụ</span>
                    <span className="text-white font-bold">Khóa học Toán THPT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mã GD</span>
                    <span className="text-white font-mono">MMN9_448A</span>
                  </div>
                </div>

                {/* Secure Badge */}
                <div className="flex items-center justify-center bg-[#d21d78]/10 py-1.5 rounded-lg border border-[#d21d78]/20">
                  <Shield className="w-3.5 h-3.5 mr-1.5 text-[#f25fa1]" />
                  <span className="text-[9px] text-[#f25fa1] font-bold uppercase tracking-wider">Mã hóa bảo mật hóa hoá</span>
                </div>
              </div>

              <button
                onClick={onInitiatePayment}
                className="w-full bg-[#d21d78] hover:bg-[#b01362] active:scale-95 text-white py-3.5 text-xs font-extrabold rounded-2xl shadow-lg shadow-[#d21d78]/35 transition-all text-center uppercase tracking-wider cursor-pointer font-sans"
              >
                Mở QR Đăng Ký Học
              </button>
            </div>

            {/* Quick QR scanning card layout */}
            <div className="w-[240px] bg-white text-slate-900 rounded-3xl p-5 shadow-2xl flex flex-col justify-between space-y-4 border border-slate-100 transform hover:-rotate-1 hover:scale-101 transition-all duration-300">
              <div className="space-y-1.5 text-center">
                <span className="inline-block bg-[#d21d78] text-white font-display text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  QUÉT QR MOMO
                </span>
                <h5 className="text-[13px] font-black tracking-tight text-slate-900 font-display">Quét nhanh chuyển tiền</h5>
              </div>

              {/* QR Vector */}
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center relative">
                <QrCode className="w-36 h-36 text-slate-900" />
                
                {/* Central pink logo */}
                <div className="absolute inset-0 m-auto w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center p-0.5 shadow-md">
                  <div className="w-full h-full bg-[#d21d78] rounded-lg flex items-center justify-center text-[10px] font-black text-white">
                    Mo
                  </div>
                </div>
              </div>

              <div className="text-center space-y-1">
                <p className="text-[10px] text-slate-550 font-sans leading-tight">
                  Mở ứng dụng <span className="font-bold text-[#d21d78]">MoMo</span>, chọn <span className="font-bold">Quét mã</span> và quét QR Code trên.
                </p>
                <span className="block text-[8px] italic text-slate-400 font-mono mt-1">Mã tự động khớp 24/7</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
