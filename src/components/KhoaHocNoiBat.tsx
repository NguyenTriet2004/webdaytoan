import { ArrowRight, Check } from "lucide-react";
import { COURSES } from "../data";
import { Course } from "../types";

interface FeaturedCoursesProps {
  onSelectCourse: (course: Course) => void;
  onExploreAll: () => void;
}

export default function FeaturedCourses({
  onSelectCourse,
  onExploreAll,
}: FeaturedCoursesProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const renderCourseIllustration = (type: string) => {
    switch (type) {
      case "grade9":
        return (
          <div className="absolute top-4 right-4 w-28 h-28 opacity-90 select-none hidden sm:block pointer-events-none">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-emerald-500 drop-shadow-md"
            >
              <polygon
                points="50,10 85,80 15,80"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <circle
                cx="50"
                cy="50"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
              <line
                x1="50"
                y1="10"
                x2="50"
                y2="80"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="2,2"
              />
              <path
                d="M 40 80 A 10 10 0 0 1 50 70"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M 50 15 L 35 45 M 50 15 L 65 45 M 35 45 L 30 70 M 65 45 L 70 70"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        );
      case "highschool":
        return (
          <div className="absolute top-4 right-4 w-28 h-28 opacity-90 select-none hidden sm:block pointer-events-none">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-[#16a34a] drop-shadow-lg"
            >
              <polygon
                points="50,20 80,35 80,65 50,80 20,65 20,35"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <line
                x1="50"
                y1="20"
                x2="50"
                y2="80"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <line
                x1="50"
                y1="50"
                x2="80"
                y2="35"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="50"
                y1="50"
                x2="20"
                y2="35"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="20"
                y1="65"
                x2="50"
                y2="50"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="2,2"
              />
              <line
                x1="80"
                y1="65"
                x2="50"
                y2="50"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="2,2"
              />
            </svg>
          </div>
        );
      case "vsat":
        return (
          <div className="absolute top-4 right-4 w-28 h-28 opacity-95 select-none hidden sm:block pointer-events-none">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-emerald-400 drop-shadow-lg"
            >
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <circle
                cx="50"
                cy="50"
                r="23"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="1,1"
              />
              <circle
                cx="50"
                cy="50"
                r="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <line
                x1="15"
                y1="15"
                x2="45"
                y2="45"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <polygon points="45,45 42,38 38,42" fill="currentColor" />
              <path
                d="M 50 5 L 50 95 M 5 50 L 95 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="4,4"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="courses-section"
      className="py-20 bg-slate-50 border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 animate-fade-in">
          <div className="space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-600 font-display">
              LỘ TRÌNH HỌC RÕ RÀNG
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#060913] tracking-tight font-display">
              Khóa học nổi bật
            </h2>
            <p className="text-slate-500 text-base max-w-2xl leading-relaxed font-sans">
              Các khóa học ôn thi trọng điểm được xây dựng công phu nhằm giúp
              các học sinh thấu hiểu sâu cơ chế, bứt phá tư duy Toán đại số và
              hình học.
            </p>
          </div>
          <button
            onClick={onExploreAll}
            className="group flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-500 hover:underline transition-all cursor-pointer whitespace-nowrap self-start md:self-end"
          >
            Xem tất cả khóa học
            <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COURSES.map((course) => {
            let gradientClass = "from-slate-900 to-emerald-950/95";
            let buttonBg = "bg-emerald-600 hover:bg-emerald-500";
            if (course.imageType === "highschool") {
              gradientClass = "from-[#0b2154] to-[#040e29]";
              buttonBg = "bg-emerald-700 hover:bg-emerald-600";
            } else if (course.imageType === "vsat") {
              gradientClass = "from-[#1e1548] to-[#0d0726]";
              buttonBg = "bg-emerald-600 hover:bg-emerald-500";
            }

            return (
              <div
                key={course.id}
                className={`relative rounded-3xl overflow-hidden text-white bg-gradient-to-b ${gradientClass} border border-slate-800 p-8 shadow-xl flex flex-col justify-between group transition-all duration-300 hover:translate-y-[-6px] hover:shadow-2xl`}
              >
                {/* Visual mathematical overlay */}
                {renderCourseIllustration(course.imageType)}

                {/* Content */}
                <div className="space-y-4 z-10 text-left">
                  <span className="inline-block bg-white/10 border border-white/10 px-3.5 py-1 rounded-full text-xs font-bold text-slate-200 uppercase tracking-wider font-display">
                    {course.title}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black font-display text-white group-hover:text-emerald-300 transition-colors leading-tight">
                      {course.tag}
                    </h3>
                  </div>

                  <ul className="space-y-3 pt-4 text-xs sm:text-sm text-slate-300/90 font-medium font-sans">
                    {course.bulletPoints.map((bullet, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mr-2.5 mt-0.5">
                          <Check className="w-3 h-3 text-emerald-400" />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom row */}
                <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between z-10">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-slate-400 font-mono text-left">
                      {course.lessonsCount} bài học video
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-white font-display mt-0.5">
                      {formatPrice(course.price)}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectCourse(course)}
                    className={`flex items-center justify-center w-11 h-11 rounded-full text-white shadow-lg ${buttonBg} transform active:scale-95 transition-all duration-250 cursor-pointer`}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
