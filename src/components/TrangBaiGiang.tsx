import { useState, useMemo } from 'react';
import { Play, Eye, Calendar, Search, Filter, Sparkles, Video, Clock, Bookmark, HelpCircle } from 'lucide-react';
import { Lecture } from '../types';

interface LecturesPageProps {
  lectures: Lecture[];
  onSelectLecture: (lecture: Lecture) => void;
}

export default function LecturesPage({ lectures, onSelectLecture }: LecturesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');

  const categoriesList = useMemo(() => {
    const cats = new Set<string>();
    lectures.forEach(l => {
      if (l.category) cats.add(l.category);
    });
    return ['All', ...Array.from(cats)];
  }, [lectures]);

  const filteredLectures = useMemo(() => {
    return lectures
      .filter((lecture) => {
        const matchesSearch = lecture.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || lecture.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return b.id.localeCompare(a.id);
        } else {
          const getViewsNum = (v: string) => {
            const clean = v.replace(/[^0-9.]/g, '');
            let parsed = parseFloat(clean);
            if (v.toLowerCase().includes('k')) parsed *= 1000;
            return isNaN(parsed) ? 0 : parsed;
          };
          return getViewsNum(b.views) - getViewsNum(a.views);
        }
      });
  }, [lectures, searchTerm, selectedCategory, sortBy]);

  const studyStats = useMemo(() => {
    return {
      completedHours: '14.5 / 45 giờ',
      completedVideos: '6 / 24 video',
      activeStreak: '5 ngày liên tiếp',
      rank: 'Top 5% Lớp'
    };
  }, []);

  return (
    <div className="py-12 bg-slate-50 min-h-[75vh]" id="lectures-page-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Banner */}
        <div className="bg-[#060913] rounded-3xl p-6 sm:p-8 md:p-10 text-white relative overflow-hidden shadow-2xl text-left">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-85 h-85 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-emerald-400 animate-pulse" />
              LỘ TRÌNH CHUYÊN SÂU BẢN QUYỀN
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight font-display">
              Kho Video <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">Bài Giảng Bản Quyền</span> Thầy Nguyên
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
              Chào mừng bạn đến với khu vực tự học thông qua kho tư liệu bài giảng số. Bạn có đặc quyền học không giới hạn toàn bộ chuyên đề ôn thi Toán vào 10 mới nhất, ôn thi tốt nghiệp THPT và chinh phục kỳ thi đánh giá tư duy lý thuyết VSAT độc quyền.
            </p>
          </div>
        </div>

        {/* Study Progress */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-md flex items-center space-x-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-450 uppercase font-bold tracking-wider font-mono">Thời gian học tập</span>
              <span className="block text-sm font-extrabold text-slate-800">{studyStats.completedHours}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-md flex items-center space-x-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-450 uppercase font-bold tracking-wider font-mono">Đã hoàn thành</span>
              <span className="block text-sm font-extrabold text-slate-800">{studyStats.completedVideos}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-md flex items-center space-x-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-450 uppercase font-bold tracking-wider font-mono">Chuỗi học tập</span>
              <span className="block text-sm font-extrabold text-slate-800">{studyStats.activeStreak}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-md flex items-center space-x-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-450 uppercase font-bold tracking-wider font-mono">Xếp hạng lớp học</span>
              <span className="block text-sm font-extrabold text-slate-800">{studyStats.rank}</span>
            </div>
          </div>
        </div>

        {/* Filter Box */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-left">
          
          <div className="relative flex-grow max-w-sm sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute top-3.5 left-4" />
            <input
              type="text"
              placeholder="Tìm kiếm nhanh tên video bài học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 focus:border-emerald-500 rounded-xl pl-11 pr-4 py-3 placeholder-slate-400 text-xs text-slate-700 outline-none transition-all"
            />
          </div>

          <div className="flex items-center space-x-4 self-start md:self-auto">
            <div className="flex items-center space-x-2 text-slate-550 text-xs">
              <Filter className="w-4 h-4 text-slate-400" />
              <span>Sắp xếp:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-100 text-xs font-semibold px-3 py-2 rounded-xl outline-none text-slate-700 cursor-pointer hover:bg-slate-100/50"
            >
              <option value="newest">Mới cập nhật</option>
              <option value="popular">Xem nhiều nhất</option>
            </select>
          </div>
        </div>

        {/* Horizontal Category Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none select-none">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/15'
                  : 'bg-white border-slate-150 text-slate-650 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat === 'All' ? 'Tất cả chuyên đề' : cat}
            </button>
          ))}
        </div>

        {/* Grid Lectures */}
        {filteredLectures.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl space-y-4">
            <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mx-auto">
              <HelpCircle className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-800">Không tìm thấy video nào</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans leading-relaxed">
                Không tìm thấy video bài giảng tương thích với từ khóa &quot;{searchTerm}&quot;. Bạn thử tìm kiếm một chuyên đề khác nhé!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredLectures.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectLecture(item)}
                className="group bg-white border border-slate-100 hover:border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  
                  <span className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-sm text-[9px] font-bold font-mono px-2 py-0.5 rounded text-white tracking-wider">
                    {item.duration}
                  </span>

                  <span className="absolute top-2.5 left-2.5 bg-[#16a34a] border border-emerald-400/20 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {item.category}
                  </span>

                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="w-11 h-11 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </span>
                  </div>
                </div>

                <div className="p-4.5 flex-grow flex flex-col justify-between space-y-4 text-left">
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug font-display">
                    {item.title}
                  </h4>

                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <div className="flex items-center space-x-2 tracking-wide font-medium">
                      <span className="flex items-center">
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        {item.views}
                      </span>
                      <span className="w-0.5 h-0.5 rounded-full bg-slate-350" />
                      <span className="flex items-center font-mono">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {item.timeAgo}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-emerald-600 hover:underline">Học ngay</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
