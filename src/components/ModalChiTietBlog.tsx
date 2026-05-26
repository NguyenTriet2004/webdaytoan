import {
  X,
  Calendar,
  BookOpen,
  AlertCircle,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { BlogPost } from "../types";
import { useState } from "react";

interface BlogDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: BlogPost | null;
}

export default function BlogDetailModal({
  isOpen,
  onClose,
  blog,
}: BlogDetailModalProps) {
  const [likes, setLikes] = useState<number>(
    () => Math.floor(Math.random() * 85) + 12,
  );
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  if (!isOpen || !blog) return null;

  // Render dummy math formulas to make it really feel like a math teaching portal
  const renderMathContent = () => {
    switch (blog.id) {
      case "blog-1":
        return (
          <div className="space-y-6 text-slate-300">
            <p>
              Trong cấu trúc đề thi tuyển sinh vào lớp 10 môn Toán, câu hỏi{" "}
              <strong>
                Rút gọn biểu thức chứa căn thức và các bài toán phụ liên quan
              </strong>{" "}
              luôn là câu gỡ điểm đầu tiên nhưng lại là nơi học sinh dễ mất điểm
              oan nhất do các lỗi trình bày hoặc bỏ sót điều kiện xác định.
            </p>

            <div className="p-5 bg-[#0d1222] border border-slate-800 rounded-xl space-y-3 font-mono text-sm text-[#16a34a]">
              <div className="text-slate-400 font-sans text-xs uppercase tracking-wider font-bold">
                Ví dụ minh họa:
              </div>
              <div>
                Rút gọn biểu thức: A = [ 1 / (√x - 1) - 1 / √x ] : [ (√x + 1) /
                (x - 1) ]
              </div>
              <div className="text-slate-500">
                // Điều kiện xác định (ĐKXĐ): x &gt; 0, x ≠ 1
              </div>
            </div>

            <h4 className="text-lg font-bold text-white font-display">
              3 Lỗi kinh điển sĩ tử lớp 9 hay mắc phải:
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-slate-350">
              <li>
                <strong className="text-white">
                  Quên tìm Điều kiện xác định (ĐKXĐ):
                </strong>{" "}
                Thường xuyên biến đổi biểu thức vô tư mà không đối chiếu điều
                kiện để biểu thức có nghĩa.
              </li>
              <li>
                <strong className="text-white">
                  Sai dấu khi thực hiện quy đồng:
                </strong>{" "}
                Khi trước ngoặc hoặc trước phân thức có dấu trừ, học sinh cực kỳ
                hay quên đổi dấu các số hạng phía sau tử số.
              </li>
              <li>
                <strong className="text-white">
                  Quên đối chiếu kết quả cuối cùng:
                </strong>{" "}
                Khi tìm x để đạt giá trị nguyên, nhiều bạn ra kết quả x = 1
                nhưng quên ĐKXĐ x ≠ 1 nên không loại nghiệm.
              </li>
            </ol>

            <div className="p-5 bg-gradient-to-r from-emerald-950/40 to-emerald-950/40 border-l-4 border-emerald-500/20 rounded-r-xl">
              <span className="font-extrabold text-emerald-400 block mb-1">
                💡 Lời khuyên của Thầy Nguyên:
              </span>
              Luôn viết &quot;ĐKXĐ: ... &quot; ngay ở dòng đầu tiên của bài
              giải. Sau khi giải ra kết quả cuối cùng, hãy ghi chữ &quot;(Thỏa
              mãn ĐKXĐ)&quot; hoặc &quot;(Loại)&quot; rõ ràng để tránh bị trừ
              0.25 điểm quý giá nhé!
            </div>
          </div>
        );
      case "blog-2":
        return (
          <div className="space-y-6 text-slate-300">
            <p>
              Trắc nghiệm Toán THPT Quốc Gia gồm 50 câu làm trong 90 phút. Tức
              là trung bình bạn chỉ có{" "}
              <strong>1.8 phút (1 phút 48 giây)</strong> cho mỗi câu hỏi. Để đạt
              điểm 9+, bạn không thể làm theo phương pháp tự luận thông thường
              mà phải có chiến thuật phân bổ thời gian &quot;vàng&quot; khoa
              học.
            </p>

            <div className="overflow-hidden border border-slate-800 rounded-xl bg-slate-900 select-none">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#05070e] text-slate-400 font-mono text-[10px] border-b border-slate-805">
                  <tr>
                    <th className="p-3">Giai đoạn</th>
                    <th className="p-3">Số câu</th>
                    <th className="p-3">Thời gian</th>
                    <th className="p-3">Mục tiêu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  <tr className="hover:bg-slate-950/30">
                    <td className="p-3 font-semibold text-white">
                      1 (Khởi động)
                    </td>
                    <td className="p-3">30 câu đầu (Nhận biết)</td>
                    <td className="p-3 text-emerald-400 font-mono">
                      25 - 30 phút
                    </td>
                    <td className="p-3">Tuyệt đối không làm sai câu dễ</td>
                  </tr>
                  <tr className="hover:bg-slate-950/30">
                    <td className="p-3 font-semibold text-white">
                      2 (Tăng tốc)
                    </td>
                    <td className="p-3">10 câu tiếp theo (Thông hiểu)</td>
                    <td className="p-3 text-amber-400 font-mono">
                      20 - 25 phút
                    </td>
                    <td className="p-3">Giải quyết triệt để dạng quen thuộc</td>
                  </tr>
                  <tr className="hover:bg-slate-950/30">
                    <td className="p-3 font-semibold text-white">
                      3 (Bứt phá 9+)
                    </td>
                    <td className="p-3">10 câu cuối (Vận dụng cao)</td>
                    <td className="p-3 text-rose-400 font-mono">
                      35 - 40 phút còn lại
                    </td>
                    <td className="p-3">
                      Sử dụng bổ đề nhanh + Ghép trục Casio
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="text-lg font-bold text-white font-display">
              Chiêu thức &quot;Ghép Trục&quot; thần tốc của Thầy Nguyên:
            </h4>
            <p className="text-slate-350">
              Với các bài toán tìm số cực trị hoặc số nghiệm của hàm hợp
              f(u(x)), thay vì đạo hàm và lập bảng biến thiên cổ điển, phương
              pháp ghép trục giúp vẽ trực tiếp bảng biến thiên của dòng u(x) chỉ
              trong vòng tối đa 40 giây. Bài toán phức tạp 5 dòng sẽ lập tức
              được quy về bài toán sơ cấp cực kỳ dễ thở.
            </p>
          </div>
        );
      case "blog-3":
        return (
          <div className="space-y-6 text-slate-300">
            <p>
              Kỳ thi đánh giá tư duy mới (VSAT) đang là xu hướng xét tuyển hàng
              đầu của các trường đại học khối ngành kỹ thuật, kinh tế trọng
              điểm. Phần tư duy định lượng trong đề không kiểm tra khả năng nhớ
              công thức phức tạp, mà chú trọng{" "}
              <strong>
                khả năng liên kết logic, xử lý dữ liệu và so sánh số lượng thực
                tế
              </strong>
              .
            </p>

            <div className="p-5 bg-emerald-950/20 border border-emerald-900/40 rounded-xl space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>Ví dụ câu hỏi tư duy định lượng chuẩn đề minh họa:</span>
              </div>
              <p className="text-slate-250 italic">
                &quot;Một nhà máy sản xuất linh kiện điện tử trong quý I đạt
                năng suất vượt 15% so với năm trước. Quý II do hỏng hóc thiết bị
                nên năng suất giảm sâu 10% so với quý I. Hỏi tổng năng suất nửa
                đầu năm nay tăng hay giảm bao nhiêu phần trăm so với cùng kỳ năm
                trước?&quot;
              </p>
            </div>

            <h4 className="text-lg font-bold text-white font-display">
              Phương pháp giải nhanh:
            </h4>
            <p className="text-slate-350">
              Hãy đặt giá trị năng suất gốc là 100 đơn vị linh kiện. <br />
              - Hết Quý I: Năng suất là 100 * (1 + 15%) = 115.
              <br />
              - Hết Quý II: Do giảm 10% so với Quý I, năng suất là 115 * (1 -
              10%) = 115 * 0.9 = 103.5.
              <br />- So với mốc ban đầu 100, tổng năng suất quý II thực tế vẫn
              tăng 3.5% chứ không phải là phép cộng trừ đơn giản (15% - 10% =
              5%) mà học sinh thường vội vàng lựa chọn.
            </p>
          </div>
        );
      default:
        // Render general user content if customized or dynamic content exists
        return (
          <div className="space-y-6 text-slate-300">
            {blog.content ? (
              <div className="whitespace-pre-wrap leading-relaxed text-slate-330">
                {blog.content}
              </div>
            ) : (
              <p className="leading-relaxed text-slate-350">{blog.summary}</p>
            )}

            <div className="p-5 bg-[#0d1222] border border-slate-800 rounded-xl mt-6">
              <span className="font-extrabold text-emerald-400 block mb-2 uppercase text-xs tracking-wider">
                Học toán tư duy cùng thầy Nguyên:
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tài liệu phác đồ chi tiết, các dạng bài rèn đề, chuyên khảo và
                video bài giảng đi kèm chủ đề này hiện đã sẵn sàng trong kho dữ
                liệu dành riêng cho học viên đã đăng ký học phí của Thầy. Hãy
                theo dõi các bài học chất lượng cao của chúng tôi!
              </p>
            </div>
          </div>
        );
    }
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      {/* Container wrapper */}
      <div
        id="blog-detail-container"
        className="bg-[#090b15] border border-slate-800/80 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
      >
        {/* Sticky Header Close Button bar overlay */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            id="close-blog-modal-btn"
            className="w-10 h-10 rounded-full bg-slate-950/70 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 flex items-center justify-center shadow-lg transition-all cursor-pointer"
            aria-label="Đóng bài viết"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 pb-8">
          {/* Hero Banner Area */}
          <div className="relative aspect-[21/9] w-full bg-slate-100 overflow-hidden">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090b15] via-slate-950/50 to-transparent" />

            {/* Category badge */}
            <div className="absolute bottom-4 left-6 bg-emerald-600 text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-widest shadow-lg">
              {blog.category}
            </div>
          </div>

          {/* Main content pane */}
          <div className="px-6 sm:px-8 mt-6 space-y-6 text-left">
            <div className="flex items-center space-x-4 text-slate-500 text-xs font-semibold select-none">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{blog.timeLeft || "Mới đăng"}</span>
              </span>
              <span className="flex items-center space-x-1 font-mono">
                <BookOpen className="w-3.5 h-3.5" />
                <span>5 phút đọc</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug font-display">
              {blog.title}
            </h2>

            {/* Content body based on blog type */}
            <div className="prose prose-invert prose-sm max-w-none border-t border-slate-850 pt-5 leading-relaxed font-sans text-slate-250">
              {renderMathContent()}
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-6 border-t border-slate-850 flex items-center justify-between select-none">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    hasLiked
                      ? "bg-emerald-600/20 border-emerald-500/30 text-emerald-400"
                      : "border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <ThumbsUp
                    className={`w-4 h-4 ${hasLiked ? "fill-emerald-400/20" : ""}`}
                  />
                  <span>Hữu ích ({likes})</span>
                </button>
                <button
                  onClick={() =>
                    alert(
                      "🔗 Đã sao chép liên kết bài viết học tập thành công!",
                    )
                  }
                  className="flex items-center justify-center p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-all cursor-pointer"
                  title="Chia sẻ liên kết"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[10px] text-slate-500 font-medium italic">
                Sáng tác & Biên soạn bởi Thạc sĩ Thầy Nguyễn
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
