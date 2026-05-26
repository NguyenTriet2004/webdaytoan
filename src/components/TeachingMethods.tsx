import React, { useState } from 'react';
import { Video, FileText, Download, Play, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { downloadFile } from '../utils/download';

interface TeachingMethodsProps {
  onSelectLecture: (lecture: any) => void;
  currentUser?: { name: string; email: string; phone: string } | null;
  documents: any[];
}

export default function TeachingMethods({ onSelectLecture, currentUser, documents = [] }: TeachingMethodsProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'documents'>('video');

  return (
    <section id="teaching-methods-section" className="py-20 bg-[#060913] text-white overflow-hidden relative border-t border-b border-slate-800">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">
            🔥 PHƯƠNG PHÁP TOÀN DIỆN
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
            Trải nghiệm Phương Pháp <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Dạy Học Kép</span> Độc Quyền
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto font-sans leading-relaxed">
            Thầy Nguyên mang đến mô hình đào tạo kết hợp bản quyền: Tự học tiện lợi qua kho chuyên đề bài giảng số đỉnh cao và bứt phá thực hành cùng thư viện hệ thống giáo trình, tài liệu tự luyện phong phú.
          </p>

          {/* Navigation Tab Bar */}
          <div className="flex bg-slate-900/80 p-1.5 rounded-full border border-slate-800/80 max-w-sm mx-auto mt-6">
            <button
              onClick={() => setActiveTab('video')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === 'video'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Bài giảng Tự Học</span>
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === 'documents'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Kho Đề & Tài Liệu</span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {activeTab === 'video' && (
              <motion.div
                key="video-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Intro details */}
                <div className="lg:col-span-5 space-y-6 text-left">
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-extrabold text-blue-400 font-mono tracking-widest">
                      CHỦ ĐỘNG TƯ DUY, KHÔNG GHÉP TOÁN HỌC VẸT
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight font-display">
                      Kho Chuyên Đề Tự Học Số Hoá Đỉnh Cao
                    </h3>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                    Học viên được cấp quyền truy cập trọn đời nền tảng bài giảng video đã quay dựng sẵn với chất lượng 1080P sắc nét. Mỗi chuyên đề bao trùm đầy đủ từ lý thuyết cốt lõi đến sơ đồ phản xạ tư duy nhanh và các phương thức Casio bứt tốc kiểm tra trắc nghiệm.
                  </p>

                  <div className="space-y-3.5 pt-2">
                    {[
                      'Hệ thống từ cơ bản, vận dụng đến vận dụng cao.',
                      'Đồng bộ hóa 100% tài liệu kèm theo ở từng video.',
                      'Hỗ trợ đâm sâu sơ đồ cây phân chia chương thi rõ ràng.',
                      'Có watermark định danh tài khoản bảo mật chống sao chép.'
                    ].map((bullet, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300 font-medium">
                        <span className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 text-[10px] font-bold font-mono mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="flex-1 leading-normal">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Player Banner */}
                <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 sm:p-5 text-left">
                  <div className="relative aspect-video rounded-xl bg-slate-950 overflow-hidden group shadow-2xl border border-slate-850">
                    <img 
                      src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=720"
                      alt="Học trực tuyến"
                      className="w-full h-full object-cover opacity-60 group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient cover blur */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

                    {/* Interaction Button */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <button 
                        onClick={() => onSelectLecture({
                          id: 'preview-video',
                          title: 'Đột phá điểm 9+: Chinh phục đồ thị hàm số chứa dấu giá trị tuyệt đối cực nâng cao',
                          category: 'Khóa nâng cao'
                        })}
                        className="relative z-25 p-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/30 group-hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                      >
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </button>
                      
                      <span className="relative z-25 mt-4 text-xs font-bold text-slate-300 uppercase tracking-widest bg-slate-950/60 px-4 py-1.5 rounded-full">
                        Hàm số giá trị tuyệt đối cực nâng cao
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-slate-450 font-mono">
                      <span>Thời lượng phát: 24 phút 15 giây</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-slate-450 font-mono">
                    <span>Thời lượng phát: 24 phút 15 giây</span>
                    <button 
                      onClick={() => onSelectLecture({
                        id: 'preview-video',
                        title: 'Đột phá điểm 9+: Chinh phục đồ thị hàm số chứa dấu giá trị tuyệt đối cực nâng cao',
                        category: 'Khóa nâng cao'
                      })}
                      className="text-blue-400 font-bold hover:underline cursor-pointer bg-transparent border-none outline-none"
                    >
                      Nhập học thử miễn phí ngay →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'documents' && (
              <motion.div
                key="documents-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
              >
                {documents.length === 0 ? (
                  <div className="col-span-full py-16 px-6 bg-slate-900/40 border border-slate-800 rounded-3xl text-center space-y-4 max-w-lg mx-auto">
                    <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-slate-200">Kho tài liệu đang cập nhật</h3>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        Tài liệu phác đồ và tài liệu kiểm tra sẽ được Thầy Nguyên cập nhật trực tiếp tại đây. Đăng ký nhận khóa học để mở khóa toàn bộ kho tài liệu chuyên sâu!
                      </p>
                    </div>
                  </div>
                ) : (
                  documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-5 bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 rounded-2xl flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-blue-900/5 transition-all group text-left"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-blue-400 font-mono tracking-wider">
                            {doc.category || 'Tài liệu'}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded-md font-mono">
                            {doc.type || 'PDF'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-100 group-hover:text-white leading-normal line-clamp-2">
                          {doc.title}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-800/50 pt-3 flex-wrap gap-2 text-xs">
                        <div className="space-y-0.5 text-slate-400 font-mono text-[10px]">
                          <span>Dung lượng: {doc.size || '2.0 MB'}</span>
                          <span className="block">Số lượt tải: {doc.downloads || '0'}</span>
                        </div>

                        <button
                          onClick={() => {
                            downloadFile(doc.id, doc.title, doc.type, doc.fileData, doc.originalName);
                          }}
                          className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600/10 hover:bg-blue-650 border border-blue-500/20 hover:border-blue-600 text-blue-400 hover:text-white font-bold rounded-xl transition-all text-[11px] cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Tải miễn phí</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
