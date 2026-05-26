import { Play, Eye, Calendar, Download } from 'lucide-react';
import { LECTURES } from '../data';
import { Lecture } from '../types';
import { downloadFile } from '../utils/download';

interface LatestLecturesProps {
  onSelectLecture: (lecture: Lecture) => void;
  onExploreLectures: () => void;
  lectures?: Lecture[];
}

export default function LatestLectures({ onSelectLecture, onExploreLectures, lectures = LECTURES }: LatestLecturesProps) {
  return (
    <section id="lectures-section" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#16a34a] font-display">
              BÀI GIẢNG MỚI NHẤT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#060913] tracking-tight font-display">
              Bài giảng mới cập nhật
            </h2>
            <p className="text-slate-500 text-base max-w-2xl leading-relaxed font-sans">
              Các bài học trọng điểm tổng hợp từ dễ đến khó để bám sát đề thi thật. Nhấp vào bất kỳ video nào để bắt đầu trải nghiệm học thử.
            </p>
          </div>
          <button
            onClick={onExploreLectures}
            className="group flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-500 hover:underline transition-all cursor-pointer whitespace-nowrap self-start md:self-end"
          >
            Xem tất cả bài giảng
            <span className="ml-1.5 transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {lectures.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectLecture(item)}
              className="group bg-white border border-slate-100 hover:border-slate-200/80 rounded-2xl overflow-hidden shadow-md shadow-slate-100/50 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Thumbnail with duration */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Duration Overlay */}
                <span className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-sm text-[10px] font-bold font-mono px-2 py-0.5 rounded text-white tracking-widest">
                  {item.duration}
                </span>

                {/* Category tag */}
                <span className="absolute top-2.5 left-2.5 bg-emerald-600/95 backdrop-blur-sm text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-display">
                  {item.category}
                </span>

                {/* Play circle overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="w-12 h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between space-y-4 text-left">
                <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug font-display">
                  {item.title}
                </h4>

                <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <div className="flex items-center space-x-2.5">
                    <span className="flex items-center">
                      <Eye className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {item.views}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {item.timeAgo}
                    </span>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadFile(null, item.title + " Bài Tập", "PDF");
                    }}
                    className="p-1.5 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-lg transition-colors cursor-pointer"
                    title="Tải tài liệu PDF bài tập kèm theo"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
