import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  Clipboard,
  MessageCircle,
  Send,
} from "lucide-react";
import { Course } from "../types";
import logoImg from "../assets/images/logo.png";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  selectedCourse?: Course | null;
  currentUser?: { name: string; email: string; phone: string } | null;
  onSubmitRegistration: (registration: {
    name: string;
    phone: string;
    email: string;
    grade: string;
  }) => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  courses,
  selectedCourse,
  currentUser,
  onSubmitRegistration,
}: PaymentModalProps) {
  const [course, setCourse] = useState<Course | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    "vietqr" | "momo" | "vnpay" | "zalopay"
  >("vietqr");
  const [copied, setCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Student details form
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  // Sync state parameters from outside
  useEffect(() => {
    if (selectedCourse) {
      setCourse(selectedCourse);
    } else if (courses.length > 0 && !course) {
      setCourse(courses[0]);
    }

    if (currentUser) {
      setStudentName(currentUser.name || "");
      setStudentPhone(currentUser.phone || "");
      setStudentEmail(currentUser.email || "");
    }
  }, [selectedCourse, courses, course, currentUser]);

  if (!isOpen) return null;

  const currentPrice = course?.price || 1250000;
  const priceFormatted = currentPrice.toLocaleString("vi-VN") + " đ";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToDashboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      alert("Vui lòng nhập Họ và tên của bạn!");
      return;
    }
    if (!studentPhone.trim()) {
      alert("Vui lòng nhập Số điện thoại liên hệ để nhận tài khoản học!");
      return;
    }

    // Submit registration request upwards
    onSubmitRegistration({
      name: studentName,
      phone: studentPhone,
      email: studentEmail || "chuyển_khoản_vãng_lai@gmail.com",
      grade: course?.title || "Khóa học chưa rõ",
    });

    setIsSuccess(true);
  };

  const handleZaloChatDirect = () => {
    if (!studentName.trim() || !studentPhone.trim()) {
      alert(
        "Vui lòng nhập Họ tên và SĐT trước khi kết nối Zalo để Thầy Nguyên tiện nhận diện giao dịch nhé!",
      );
      return;
    }

    const customMessage = `Chào Thầy Nguyên, em là ${studentName} (SĐT: ${studentPhone}), em vừa chuyển khoản số tiền ${priceFormatted} đăng ký khóa học: "${course?.title}". Mong Thầy đối soát và kích hoạt quyền truy cập học tập cho em với ạ!`;
    const encodedMsg = encodeURIComponent(customMessage);

    // Copy precomposed message helper
    navigator.clipboard.writeText(customMessage);
    alert(
      '📋 ĐÃ SAO CHÉP BIÊN LAI TIN NHẮN:\n\nTin nhắn đăng ký tự động đã được sao chép vào bộ nhớ đệm. Bạn chỉ cần nhấn nút Zalo, mở chat với Thầy Nguyên và bấm "Dán" (Ctrl+V) để gửi qua sdt Zalo Thầy 0945538554!',
    );

    // Open chat link
    window.open(`https://zalo.me/0945538554`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b0e17] border border-slate-800 text-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center space-y-6 py-6 animate-fade-in font-sans">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2 text-center">
              <span className="inline-block text-[9px] uppercase font-bold tracking-widest text-emerald-400 font-mono bg-emerald-500/15 px-3 py-1 rounded-full">
                GỬI YÊU CẦU THÀNH CÔNG
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display pt-1">
                Yêu cầu đã được gửi đến Thầy Nguyên!
              </h3>
              <p className="text-xs text-slate-350 max-w-md mx-auto leading-relaxed">
                Hồ sơ của bạn đã được ghi nhận trên **Dashboard của Thầy**. Thầy
                Nguyên và đội ngũ trợ giảng sẽ nhanh chóng xem xét biên lai đối
                soát và mở khóa trực tuyến trong vòng 5-10 phút.
              </p>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-850 max-w-sm mx-auto text-xs font-mono text-slate-400 space-y-1.5 text-left">
              <div className="flex justify-between">
                <span>Học viên chuyển số:</span>
                <span className="text-white font-bold">{studentName}</span>
              </div>
              <div className="flex justify-between">
                <span>Khóa học đăng ký:</span>
                <span className="text-emerald-400 font-bold">{course?.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Tổng học phí:</span>
                <span className="text-emerald-400 font-bold">
                  {priceFormatted}
                </span>
              </div>
              <div className="flex justify-between text-[11px] pt-1.5 border-t border-slate-800 text-slate-500">
                <span>Số điện thoại:</span>
                <span className="text-slate-300">{studentPhone}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto pt-2">
              <button
                onClick={handleZaloChatDirect}
                className="flex-1 px-5 py-3 bg-[#16a34a] hover:bg-[#15803d] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all text-white cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Nhắn minh chứng qua Zalo</span>
              </button>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-700"
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-left">
            {/* Top Header Branding */}
            <div className="flex items-center space-x-3 select-none">
              <div className="w-9 h-9 overflow-hidden p-0.5">
                <img
                  src={logoImg}
                  referrerPolicy="no-referrer"
                  alt="KN Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-widest font-mono font-bold text-emerald-400 leading-none">
                  CỔNG LIÊN KẾT NHẬP HỌC
                </span>
                <span className="block text-sm font-extrabold text-white font-display pt-0.5">
                  Đăng Ký & Thanh Toán Học Phí Thầy Nguyên
                </span>
              </div>
            </div>

            {/* Layout Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Settings & Student Form */}
              <div className="lg:col-span-6 space-y-4">
                <div className="space-y-4 bg-slate-900/40 p-4 border border-slate-850 rounded-2xl">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-slate-850 pb-2">
                    1. Xác nhận thông tin người chuyển tiền
                  </h4>

                  <form onSubmit={handleSendToDashboard} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase font-mono">
                        Họ tên học viên (or Tên chủ TK chuyển)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="VD: Nguyễn Hoài Nam"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-705 outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase font-mono">
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="VD: 0912345678"
                          value={studentPhone}
                          onChange={(e) => setStudentPhone(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-705 outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase font-mono">
                          Địa chỉ Email
                        </label>
                        <input
                          type="email"
                          placeholder="VD: nam@gmail.com"
                          value={studentEmail}
                          onChange={(e) => setStudentEmail(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-705 outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase font-mono">
                        Khóa học đăng ký
                      </label>
                      <select
                        value={course?.id || ""}
                        onChange={(e) => {
                          const selected = courses.find(
                            (c) => c.id === e.target.value,
                          );
                          if (selected) setCourse(selected);
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none cursor-pointer"
                      >
                        {courses.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title} ({c.price.toLocaleString("vi-VN")} đ)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold py-3 text-xs rounded-xl shadow-lg shadow-emerald-600/15 uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 font-sans"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Chuyển tiền xong, Gửi yêu cầu duyệt</span>
                      </button>
                    </div>
                  </form>
                </div>

                <div className="text-center">
                  <span className="text-[10px] text-slate-500">- HOẶC -</span>
                </div>

                {/* Direct Zalo Trigger Option */}
                <button
                  type="button"
                  onClick={handleZaloChatDirect}
                  className="w-full bg-[#16a34a]/10 hover:bg-[#16a34a]/15 border border-[#16a34a]/30 hover:border-[#16a34a]/50 text-emerald-400 font-bold py-3 text-xs rounded-xl uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-emerald-400" />
                  <span>Gửi tin kích hoạt nhanh đến Zalo: 0945538554</span>
                </button>
              </div>

              {/* Right Column: Dynamic VietQR Canvas */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-5 bg-slate-950/45 border border-slate-850 rounded-2xl lg:h-full relative overflow-hidden text-center">
                <div className="relative p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100 select-none mx-auto mb-4">
                  <QrCode className="w-40 h-40 text-slate-900" />

                  {/* Logo overlay on QR */}
                  <div className="absolute inset-0 m-auto w-10 h-10 bg-white border border-slate-100 rounded-lg flex items-center justify-center p-0.5 shadow">
                    <div className="w-full h-full bg-emerald-900 rounded-lg flex items-center justify-center text-[7px] font-black italic text-white leading-none">
                      MBBank
                    </div>
                  </div>
                </div>

                <p className="text-emerald-400 font-mono font-bold text-base leading-none mb-4">
                  {priceFormatted}
                </p>

                {/* Real MB Bank details */}
                <div className="w-full text-left bg-slate-900/60 p-4 rounded-xl border border-slate-850 text-[11px] text-slate-300 font-sans space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ngân hàng</span>
                    <span className="font-bold text-white uppercase">
                      MB BANK (Ngân hàng Quân Đội)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Số tài khoản</span>
                    <div className="flex items-center space-x-1">
                      <span className="font-mono font-bold text-white">
                        0945538554
                      </span>
                      <button
                        onClick={() => handleCopy("0945538554")}
                        className="p-1 hover:bg-slate-800 rounded text-emerald-400 cursor-pointer"
                      >
                        <Clipboard className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Chủ tài khoản</span>
                    <span className="font-bold text-white uppercase">
                      NGUYỄN KHOA NGUYÊN
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Nội dung CK</span>
                    <div className="flex items-center space-x-1">
                      <span className="font-mono font-bold text-emerald-400">
                        TOAN TN {studentPhone || "HP"}
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(`TOAN TN ${studentPhone || "HP"}`)
                        }
                        className="p-1 hover:bg-slate-800 rounded text-emerald-400 cursor-pointer"
                      >
                        <Clipboard className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {copied && (
                  <span className="block mt-2 text-[10px] text-emerald-400 font-bold leading-none animate-pulse">
                    ✓ Đã sao chép vào bộ nhớ đệm!
                  </span>
                )}
              </div>
            </div>

            {/* Shield Check Guidelines */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center space-x-2 text-[10px] text-slate-500 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>
                Giao dịch an toàn được đối soát bảo mật trực tiếp bởi Admin Thầy
                Nguyên.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
