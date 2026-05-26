import { Calendar, ArrowRight } from 'lucide-react';
import { BLOGS } from '../data';
import { BlogPost } from '../types';

interface LatestBlogsProps {
  blogs: BlogPost[];
  onSelectBlog: (blog: BlogPost) => void;
  onExploreBlogs: () => void;
}

export default function LatestBlogs({ blogs, onSelectBlog, onExploreBlogs }: LatestBlogsProps) {
  return (
    <section id="blogs-section" className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Blog Header block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 animate-fade-in text-left">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 font-display">
              KIẾN THỨC HAY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#060913] tracking-tight font-display">
              Bài viết mới nhất
            </h2>
            <p className="text-slate-505 text-base max-w-2xl leading-relaxed">
              Các cẩm nang kinh nghiệm, bí kíp phân bổ thời gian làm đề thi và phân tích chuyên sâu các dạng Toán học thường xuất hiện trong đề.
            </p>
          </div>
          <button
            onClick={onExploreBlogs}
            className="group flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-all cursor-pointer whitespace-nowrap self-start md:self-end"
          >
            Xem tất cả bài viết
            <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid or fallback */}
        {blogs.length === 0 ? (
          <div className="py-12 bg-white border border-slate-150 rounded-3xl text-center max-w-sm mx-auto space-y-3.5 shadow-sm">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2005/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-800">Cẩm nang ôn tập đang cập nhật</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Thầy Nguyên đang tổng hợp hệ đề cương bám sát ma trận đề minh họa và sẽ xuất bản trực tiếp tại đây sớm nhất.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => onSelectBlog(blog)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 cursor-pointer flex flex-col justify-between text-left"
              >
                {/* Image and Category badge */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category tag */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {blog.category}
                  </div>
                </div>

                {/* Blog info */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug font-display">
                      {blog.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {blog.summary}
                    </p>
                  </div>

                  {/* Footer status bar */}
                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <div className="flex items-center space-x-1 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{blog.timeLeft}</span>
                    </div>
                    
                    <span className="text-[11px] font-semibold text-blue-600 group-hover:underline flex items-center">
                      Đọc thêm <span className="ml-0.5 group-hover:translate-x-0.5 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
