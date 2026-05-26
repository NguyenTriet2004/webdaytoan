import React, { useState, useMemo, useEffect } from "react";
import {
  Users,
  BookOpen,
  Plus,
  Search,
  Check,
  Trash2,
  DollarSign,
  Video,
  Send,
  CheckCircle2,
  FileText,
  Image,
  Upload,
} from "lucide-react";
import { Lecture, Student, BlogPost } from "../types";
import avatarImg from "../assets/images/avarta.png";

interface TeacherDashboardProps {
  lectures: Lecture[];
  onAddLecture: (newLecture: Omit<Lecture, "id" | "views" | "timeAgo">) => void;
  onDeleteLecture: (id: string) => void;
  blogs: BlogPost[];
  onAddBlog: (newBlog: Omit<BlogPost, "id" | "timeLeft">) => void;
  onUpdateBlog: (updatedBlog: BlogPost) => void;
  onDeleteBlog: (id: string) => void;

  // Documents/Materials state & actions (lifting up to App state)
  documents: any[];
  onAddDocument: (newDoc: {
    title: string;
    category: string;
    type: string;
    size: string;
    downloads: string;
    fileData?: string;
    originalName?: string;
  }) => void;
  onDeleteDocument: (id: string) => void;

  // Students roster state & actions
  students: Student[];
  onUpdatePaymentStatus: (
    id: string,
    newStatus: "paid" | "pending" | "unpaid",
  ) => void;
  onDeleteStudent: (id: string) => void;
  onToggleStudentActive: (id: string) => void;

  onClose: () => void;
}

const extractYoutubeVideoId = (url: string): string => {
  if (!url) return "";
  const trimmed = url.trim();
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/|live\/)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  if (
    match &&
    match[2] &&
    match[2].trim().length >= 8 &&
    match[2].trim().length <= 15
  ) {
    return match[2].trim();
  }
  try {
    if (trimmed.includes("shorts/")) {
      return (
        trimmed.split("shorts/")[2] ||
        trimmed.split("shorts/")[1]?.split("?")[0]?.split("&")[0] ||
        ""
      );
    } else if (trimmed.includes("live/")) {
      return trimmed.split("live/")[1]?.split("?")[0]?.split("&")[0] || "";
    } else if (trimmed.includes("watch?v=")) {
      return trimmed.split("watch?v=")[1]?.split("&")[0] || "";
    } else if (trimmed.includes("youtu.be/")) {
      return trimmed.split("youtu.be/")[1]?.split("?")[0]?.split("&")[0] || "";
    } else if (trimmed.includes("embed/")) {
      return trimmed.split("embed/")[1]?.split("?")[0]?.split("&")[0] || "";
    }
  } catch (e) {
    // ignore
  }
  return "";
};

export default function TeacherDashboard({
  lectures,
  onAddLecture,
  onDeleteLecture,
  blogs,
  onAddBlog,
  onUpdateBlog,
  onDeleteBlog,
  documents = [],
  onAddDocument,
  onDeleteDocument,
  students = [],
  onUpdatePaymentStatus,
  onDeleteStudent,
  onToggleStudentActive,
  onClose,
}: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "lectures" | "blogs" | "documents"
  >("lectures");

  // CUSTOM CONFIRMATION MODAL STATE (to bypass browser confirm blocks inside iframe)
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    type: "video" | "blog" | "document" | "student";
    title: string;
  } | null>(null);

  const handleConfirmDelete = () => {
    if (!deleteConfirm) return;
    const { id, type } = deleteConfirm;
    if (type === "video") {
      onDeleteLecture(id);
    } else if (type === "blog") {
      onDeleteBlog(id);
    } else if (type === "document") {
      onDeleteDocument(id);
    } else if (type === "student") {
      onDeleteStudent(id);
    }
    setDeleteConfirm(null);
  };

  // BLOGS STATES
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Ôn Thi Vào 10");
  const [blogSummary, setBlogSummary] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImageUrl, setBlogImageUrl] = useState(
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400",
  );
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogSuccess, setBlogSuccess] = useState(false);

  // MATERIALS/DOCUMENTS FORM STATES
  const [docTitle, setDocTitle] = useState("");
  const [docCategory, setDocCategory] = useState("Toán lớp 9");
  const [docType, setDocType] = useState("PDF");
  const [docSize, setDocSize] = useState("2.4 MB");
  const [docSuccess, setDocSuccess] = useState(false);
  const [docFileData, setDocFileData] = useState("");
  const [docOriginalName, setDocOriginalName] = useState("");

  const handleEditBlogClick = (blog: BlogPost) => {
    setEditingBlogId(blog.id);
    setBlogTitle(blog.title);
    setBlogCategory(blog.category);
    setBlogSummary(blog.summary);
    setBlogContent(blog.content || "");
    setBlogImageUrl(blog.imageUrl);
  };

  const handleCancelEditBlog = () => {
    setEditingBlogId(null);
    setBlogTitle("");
    setBlogCategory("Ôn Thi Vào 10");
    setBlogSummary("");
    setBlogContent("");
    setBlogImageUrl(
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400",
    );
  };

  const handlePublishOrUpdateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim()) {
      alert("Vui lòng nhập tiêu đề bài viết!");
      return;
    }

    if (editingBlogId) {
      onUpdateBlog({
        id: editingBlogId,
        title: blogTitle,
        category: blogCategory,
        summary: blogSummary,
        content: blogContent,
        imageUrl: blogImageUrl,
        timeLeft: "Vừa chỉnh sửa",
      });
      setBlogSuccess(true);
      handleCancelEditBlog();
    } else {
      onAddBlog({
        title: blogTitle,
        category: blogCategory,
        summary: blogSummary,
        content: blogContent,
        imageUrl: blogImageUrl,
      });
      setBlogSuccess(true);
      setBlogTitle("");
      setBlogCategory("Ôn Thi Vào 10");
      setBlogSummary("");
      setBlogContent("");
      setBlogImageUrl(
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400",
      );
    }

    setTimeout(() => {
      setBlogSuccess(false);
    }, 4000);
  };

  // Student roster filters
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Lecture form states
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureCategory, setLectureCategory] = useState("Toán lớp 9");
  const [lectureDuration, setLectureDuration] = useState("25:00");
  const [lectureYoutubeUrl, setLectureYoutubeUrl] = useState("");
  const [lectureThumbnail, setLectureThumbnail] = useState(
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600",
  );
  const [formSuccess, setFormSuccess] = useState(false);

  const [uploadSource, setUploadSource] = useState<"youtube" | "file">(
    "youtube",
  );
  const [localVideoFile, setLocalVideoFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Sync YouTube URLs automatically
  useEffect(() => {
    if (uploadSource === "youtube" && lectureYoutubeUrl.trim()) {
      const videoId = extractYoutubeVideoId(lectureYoutubeUrl);
      if (videoId && videoId.length >= 8) {
        setLectureThumbnail(
          `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        );
      }
    }
  }, [lectureYoutubeUrl, uploadSource]);

  const filteredStudents = useMemo(() => {
    return students.filter((std) => {
      const matchSearch =
        std.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        std.phone.includes(searchTerm) ||
        std.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchGrade = gradeFilter === "all" || std.grade === gradeFilter;
      const matchStatus =
        statusFilter === "all" || std.paymentStatus === statusFilter;
      return matchSearch && matchGrade && matchStatus;
    });
  }, [students, searchTerm, gradeFilter, statusFilter]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const statsSummary = useMemo(() => {
    const paidCount = students.filter((s) => s.paymentStatus === "paid").length;
    const pendingCount = students.filter(
      (s) => s.paymentStatus === "pending",
    ).length;
    const activeCount = students.length;
    const totalFeesCollected = paidCount * 1250000;
    return {
      paidCount,
      pendingCount,
      activeCount,
      totalFeesCollected,
    };
  }, [students]);

  const handlePublishLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lectureTitle.trim()) {
      alert("Vui lòng nhập tiêu đề bài học!");
      return;
    }

    if (uploadSource === "file" && !localVideoFile) {
      alert("Vui lòng kéo thảo hoặc tải lên file video từ máy của bạn!");
      return;
    }

    if (uploadSource === "youtube" && !lectureYoutubeUrl.trim()) {
      alert("Vui lòng nhập link YouTube bài giảng!");
      return;
    }

    if (uploadSource === "file") {
      setIsUploading(true);
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((old) => {
          if (old >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsUploading(false);
              onAddLecture({
                title: lectureTitle,
                category: lectureCategory,
                duration: lectureDuration,
                imageUrl:
                  "https://images.unsplash.com/photo-1518133680790-3985eccf5214?auto=format&fit=crop&q=80&w=600",
                videoUrl: localVideoFile
                  ? URL.createObjectURL(localVideoFile)
                  : "https://www.youtube.com/embed/LsznKPhh1p0",
              });
              setFormSuccess(true);
              setLectureTitle("");
              setLocalVideoFile(null);
              setTimeout(() => setFormSuccess(false), 4000);
            }, 600);
            return 100;
          }
          return old + 20;
        });
      }, 200);
    } else {
      onAddLecture({
        title: lectureTitle,
        category: lectureCategory,
        duration: lectureDuration,
        imageUrl: lectureThumbnail,
        videoUrl: lectureYoutubeUrl,
      });
      setFormSuccess(true);
      setLectureTitle("");
      setLectureYoutubeUrl("");
      setTimeout(() => setFormSuccess(false), 4000);
    }
  };

  // Add Document Submit
  const handlePublishDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) {
      alert("Vui lòng nhập tên tài liệu hoặc lựa chọn file!");
      return;
    }

    onAddDocument({
      title: docTitle,
      category: docCategory,
      type: docType,
      size: docSize,
      downloads: String(Math.floor(100 + Math.random() * 500)),
      fileData: docFileData,
      originalName: docOriginalName,
    });

    setDocSuccess(true);
    setDocTitle("");
    setDocType("PDF");
    setDocSize("2.4 MB");
    setDocFileData("");
    setDocOriginalName("");

    setTimeout(() => {
      setDocSuccess(false);
    }, 4000);
  };

  // Autofill document details when teacher uploads a real file from local device
  const handleDocDeviceFileSelector = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDocTitle(file.name.replace(/\.[^/.]+$/, "")); // Strip extension from name
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      setDocSize(sizeMB);
      const ext = file.name.split(".").pop()?.toUpperCase() || "PDF";
      setDocType(ext);
      setDocOriginalName(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          const base64Data = reader.result.split(",")[1] || "";
          setDocFileData(base64Data);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="bg-[#090c15] border border-slate-800 rounded-3xl w-full max-w-6xl h-[90vh] overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Header Title Console Bar */}
        <div className="px-6 py-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center space-x-3 text-left">
            <div className="relative w-10 h-10 overflow-hidden">
              <img
                src={avatarImg}
                referrerPolicy="no-referrer"
                alt="Avatar Thầy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <span className="block text-[10px] uppercase font-bold text-blue-400 tracking-widest font-mono leading-none mb-1">
                Quản Trị Viên
              </span>
              <h3 className="text-base font-extrabold text-white font-display uppercase tracking-tight leading-none">
                Khoá Học Thầy Nguyên Console
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full select-none">
              <span className="text-xs text-blue-300 font-semibold font-mono tracking-wide">
                Quy mô: {statsSummary.activeCount} học sinh thực tế
              </span>
            </div>
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide border border-slate-700 transition-all cursor-pointer font-sans"
            >
              Thoát Quản Trị
            </button>
          </div>
        </div>

        {/* Console Workspace Box */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Dashboard Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center space-x-4 select-none">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 uppercase font-bold">
                  Xét duyệt học viên
                </span>
                <span className="block text-xl font-bold font-display text-white">
                  {statsSummary.activeCount} học sinh
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center space-x-4 select-none">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 uppercase font-bold">
                  Đã kích hoạt khóa học
                </span>
                <span className="block text-xl font-bold font-display text-white">
                  {statsSummary.paidCount} / {statsSummary.activeCount} học viên
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center space-x-4 select-none">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 uppercase font-bold">
                  Giáo Trình Số
                </span>
                <span className="block text-xl font-bold font-display text-white">
                  {lectures.length} bài dạng video
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center space-x-4 select-none">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 uppercase font-bold">
                  Đề thi / Tài liệu
                </span>
                <span className="block text-xl font-bold font-display text-white">
                  {documents.length} tập tin có sẵn
                </span>
              </div>
            </div>
          </div>

          {/* Console Workspace Tabs Selector */}
          <div className="flex border-b border-slate-800 space-x-6 pb-px select-none text-left">
            <button
              onClick={() => setActiveTab("lectures")}
              className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "lectures"
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Học Viên & Bài Giảng
            </button>
            <button
              onClick={() => {
                setActiveTab("blogs");
                handleCancelEditBlog();
              }}
              className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "blogs"
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Quản lý Cẩm Nang / Bài Viết ({blogs.length})
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "documents"
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Quản lý Giáo Trình / Tài Liệu ({documents.length})
            </button>
          </div>

          {/* TAB 1: LECTURES AND STUDENT ROSTER */}
          {activeTab === "lectures" && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                {/* Left Form: Video lecture publisher */}
                <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
                  <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 text-left">
                    <Video className="w-5 h-5 text-blue-500" />
                    <h4 className="text-sm font-bold text-slate-100 font-display uppercase tracking-tight">
                      Đăng Tải Bài Giảng Mới
                    </h4>
                  </div>

                  {formSuccess && (
                    <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/25 rounded-xl text-center text-xs text-emerald-400 font-sans">
                      🎉 Bài giảng mới đã được xuất bản và cập nhật trực tiếp
                      lên hệ sinh thái của học viên thành công!
                    </div>
                  )}

                  {/* Choose Source Toggle */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-850">
                    <button
                      type="button"
                      onClick={() => setUploadSource("youtube")}
                      className={`py-2 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                        uploadSource === "youtube"
                          ? "bg-blue-600 text-white shadow"
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      Link YouTube
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadSource("file")}
                      className={`py-2 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                        uploadSource === "file"
                          ? "bg-blue-600 text-white shadow"
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      Tải từ thiết bị
                    </button>
                  </div>

                  <form onSubmit={handlePublishLecture} className="space-y-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                        Tiêu đề bài học
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Chuyên khảo Đồ thị Hàm số bậc hai nâng cao"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none font-sans"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                        Nhóm lớp học
                      </label>
                      <select
                        value={lectureCategory}
                        onChange={(e) => setLectureCategory(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 outline-none cursor-pointer font-sans"
                      >
                        <option value="Toán lớp 9">Toán lớp 9</option>
                        <option value="Toán THPT">Toán THPT</option>
                        <option value="VSAT">Chuyên đề VSAT</option>
                      </select>
                    </div>

                    {uploadSource === "file" ? (
                      <div className="space-y-2 text-left">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                          Tải lên file video bài giảng
                        </label>

                        <div
                          onDragEnter={(e) => {
                            e.preventDefault();
                            setIsDragActive(true);
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragActive(true);
                          }}
                          onDragLeave={(e) => {
                            e.preventDefault();
                            setIsDragActive(false);
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsDragActive(false);
                            if (
                              e.dataTransfer.files &&
                              e.dataTransfer.files[0]
                            ) {
                              const file = e.dataTransfer.files[0];
                              if (file.type.startsWith("video/")) {
                                setLocalVideoFile(file);
                              } else {
                                alert(
                                  "Vui lòng chỉ tải lên định dạng file video (MP4, MKV, MOV)!",
                                );
                              }
                            }
                          }}
                          onClick={() =>
                            document
                              .getElementById("device-video-file-picker")
                              ?.click()
                          }
                          className={`relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                            isDragActive
                              ? "border-blue-500 bg-blue-500/5"
                              : localVideoFile
                                ? "border-emerald-500 bg-emerald-500/5"
                                : "border-slate-800 hover:border-slate-700 bg-slate-950/40"
                          }`}
                        >
                          <input
                            id="device-video-file-picker"
                            type="file"
                            accept="video/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setLocalVideoFile(e.target.files[0]);
                              }
                            }}
                            className="hidden"
                          />

                          {localVideoFile ? (
                            <div className="space-y-2 select-none">
                              <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                              <div>
                                <p className="text-xs font-bold text-slate-200 truncate max-w-[190px] mx-auto">
                                  {localVideoFile.name}
                                </p>
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                                  {(
                                    localVideoFile.size /
                                    (1024 * 1024)
                                  ).toFixed(2)}{" "}
                                  MB • Sẵn sàng
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2 select-none">
                              <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-300">
                                  Kéo thả hoặc Click chọn file
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                          Đường dẫn YouTube (Video URL)
                        </label>
                        <input
                          type="text"
                          required={uploadSource === "youtube"}
                          placeholder="Dán link ví dụ: https://www.youtube.com/watch?v=gAnD_Hj0fX8"
                          value={lectureYoutubeUrl}
                          onChange={(e) => setLectureYoutubeUrl(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl px-4 py-2.5 text-white focus:border-blue-500 outline-none font-mono placeholder:text-slate-700"
                        />
                      </div>
                    )}

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-bold text-slate-400">
                        Hình nền bài học (Thumbnail)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Hình nền bài học..."
                        value={lectureThumbnail}
                        onChange={(e) => setLectureThumbnail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 outline-none font-mono focus:border-blue-500"
                      />
                    </div>

                    {lectureThumbnail && (
                      <div className="rounded-xl border border-slate-850 p-1 bg-slate-950 relative aspect-video animate-fade-in">
                        <img
                          src={lectureThumbnail}
                          alt="Preview lecture background"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute top-2 left-2 bg-blue-600 text-white font-mono text-[8px] font-black px-2 py-0.5 rounded tracking-wide uppercase">
                          Ảnh nền bài học
                        </div>
                      </div>
                    )}

                    {isUploading ? (
                      <div className="space-y-2 pt-2 text-left font-sans">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                          <span className="animate-pulse text-blue-400">
                            Đang mã hoá video học...
                          </span>
                          <span>{Math.round(uploadProgress)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-150 ease-out"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold py-3 text-xs rounded-xl shadow-lg shadow-blue-600/20 uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 font-sans"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Xác nhận đăng bài giảng</span>
                      </button>
                    )}
                  </form>
                </div>

                {/* Right Side: Registered Students Verification table */}
                <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
                    <h4 className="text-sm font-bold text-slate-100 font-display uppercase tracking-tight">
                      Tìm kiếm học viên đăng ký ({filteredStudents.length} /{" "}
                      {students.length} hồ sơ)
                    </h4>

                    <div className="flex items-center gap-2 select-none">
                      <select
                        value={gradeFilter}
                        onChange={(e) => {
                          setGradeFilter(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="bg-slate-950 border border-slate-800 text-xs px-2.5 py-1.5 rounded-lg outline-none text-slate-300 cursor-pointer font-sans"
                      >
                        <option value="all">Tất cả lớp</option>
                        <option value="Toán lớp 9">Toán lớp 9</option>
                        <option value="Toán THPT">Toán THPT</option>
                        <option value="VSAT">Chuyên đề VSAT</option>
                      </select>

                      <select
                        value={statusFilter}
                        onChange={(e) => {
                          setStatusFilter(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="bg-slate-950 border border-slate-800 text-xs px-2.5 py-1.5 rounded-lg outline-none text-slate-300 cursor-pointer font-sans"
                      >
                        <option value="all">Tất cả học phí</option>
                        <option value="paid">Đã duyệt (paid)</option>
                        <option value="pending">Chờ kiểm tra (pending)</option>
                        <option value="unpaid">Chưa đóng học phí</option>
                      </select>
                    </div>
                  </div>

                  <div className="relative text-left">
                    <Search className="w-4 h-4 text-slate-550 absolute top-3.5 left-4" />
                    <input
                      type="text"
                      placeholder="Tìm nhanh theo Họ tên, Email, SĐT của học sinh chuyển khoản..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 placeholder-slate-600 text-xs outline-none focus:border-blue-500 text-slate-200"
                    />
                  </div>

                  {/* Students roster Table */}
                  <div className="overflow-x-auto border border-slate-800/40 rounded-xl">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-[#05070e] text-slate-400 font-mono text-[10px] uppercase border-b border-slate-850">
                        <tr>
                          <th className="p-3 text-left">
                            Học sinh chuyển khoản
                          </th>
                          <th className="p-3 text-left">Khóa học đăng ký</th>
                          <th className="p-3 text-left">Số điện thoại</th>
                          <th className="p-3 text-center">
                            Trạng thái học phí
                          </th>
                          <th className="p-3 text-right">Duyệt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/45 text-slate-300">
                        {paginatedStudents.length === 0 ? (
                          <tr>
                            <td
                              colSpan={5}
                              className="p-8 text-center text-slate-500 italic font-sans text-xs"
                            >
                              Hiện chưa có học sinh nào đăng ký xét duyệt học
                              phí!
                            </td>
                          </tr>
                        ) : (
                          paginatedStudents.map((std) => (
                            <tr
                              key={std.id}
                              className="hover:bg-slate-950/40 transition-colors"
                            >
                              <td className="p-3 text-left">
                                <div className="flex items-center space-x-2.5 text-left">
                                  <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                                      std.paymentStatus === "paid"
                                        ? "bg-emerald-500/10 text-emerald-450"
                                        : "bg-amber-500/10 text-amber-500"
                                    }`}
                                  >
                                    {std.name.charAt(
                                      std.name.lastIndexOf(" ") + 1,
                                    ) || std.name.charAt(0)}
                                  </div>
                                  <div className="text-left">
                                    <span className="block font-bold text-slate-200">
                                      {std.name}
                                    </span>
                                    <span className="block text-[10px] text-slate-500 font-mono">
                                      {std.email}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 text-left">
                                <span className="font-semibold text-slate-300 text-xs">
                                  {std.grade}
                                </span>
                              </td>
                              <td className="p-3 font-mono text-slate-400 text-left">
                                {std.phone}
                              </td>
                              <td className="p-3 text-center">
                                <select
                                  value={std.paymentStatus}
                                  onChange={(e) =>
                                    onUpdatePaymentStatus(
                                      std.id,
                                      e.target.value as any,
                                    )
                                  }
                                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full outline-none font-sans cursor-pointer ${
                                    std.paymentStatus === "paid"
                                      ? "bg-emerald-500/10 text-emerald-405 border border-emerald-500/20"
                                      : std.paymentStatus === "pending"
                                        ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                  }`}
                                >
                                  <option
                                    value="paid"
                                    className="bg-slate-950 text-white"
                                  >
                                    Đã học phí (Mở khóa)
                                  </option>
                                  <option
                                    value="pending"
                                    className="bg-slate-950 text-white"
                                  >
                                    Chờ đối soát (Checking)
                                  </option>
                                  <option
                                    value="unpaid"
                                    className="bg-slate-950 text-white"
                                  >
                                    Chưa đóng học phí
                                  </option>
                                </select>
                              </td>
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      onToggleStudentActive(std.id)
                                    }
                                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                      std.active
                                        ? "border-blue-500/20 text-blue-450 hover:bg-blue-500/10"
                                        : "border-slate-800 text-slate-650 hover:bg-slate-800"
                                    }`}
                                    title={
                                      std.active
                                        ? "Tạm chặn khóa học"
                                        : "Kích hoạt khóa học"
                                    }
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setDeleteConfirm({
                                        id: std.id,
                                        type: "student",
                                        title:
                                          "Hồ sơ: " + (std.name || std.email),
                                      });
                                      if (false) {
                                        onDeleteStudent(std.id);
                                      }
                                    }}
                                    className="p-1.5 border border-slate-800 text-slate-500 hover:text-red-405 hover:border-red-500/20 rounded-lg transition-colors cursor-pointer"
                                    title="Xóa yêu cầu"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[10px] text-slate-500 font-mono text-left">
                        Hiển thị {paginatedStudents.length} /{" "}
                        {filteredStudents.length} kết quả
                      </span>
                      <div className="flex space-x-1 select-none">
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1}
                          className="p-1 px-2.5 bg-slate-950 border border-slate-850 hover:bg-slate-850 disabled:opacity-30 text-xs text-slate-300 font-mono rounded-lg transition-colors cursor-pointer"
                        >
                          Trước
                        </button>
                        <span className="text-xs text-slate-400 self-center font-mono px-3">
                          Trang {currentPage} / {totalPages}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="p-1 px-2.5 bg-slate-950 border border-slate-850 hover:bg-slate-850 disabled:opacity-30 text-xs text-slate-300 font-mono rounded-lg transition-colors cursor-pointer"
                        >
                          Sau
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Danh sách bài giảng video đang phát hành (Quản lý & Xóa) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mt-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-3 gap-2 text-left">
                  <div className="flex items-center space-x-2">
                    <Video className="w-5 h-5 text-blue-500" />
                    <h4 className="text-sm font-bold text-slate-100 font-display uppercase tracking-tight">
                      Danh sách bài giảng video đang phát hành (
                      {lectures.length} bài học)
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono tracking-wider italic">
                    Xoá video sẽ gỡ bỏ quyền xem trực tiếp của học viên ngay lập
                    tức
                  </span>
                </div>

                {lectures.length === 0 ? (
                  <div className="p-10 text-center text-slate-500 italic font-sans text-xs">
                    Chưa có bài giảng video nào. Bạn hãy thử đăng tải một bài ở
                    cột bên trái!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lectures.map((lecture) => (
                      <div
                        key={lecture.id}
                        className="group p-3 bg-slate-950/80 border border-slate-850 hover:border-slate-800 rounded-2xl flex space-x-3 transition-all relative text-left"
                      >
                        <div className="w-24 aspect-video rounded-xl bg-slate-900 border border-slate-800 overflow-hidden relative flex-shrink-0">
                          <img
                            src={
                              lecture.imageUrl ||
                              "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600"
                            }
                            alt={lecture.title}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform"
                          />
                          <span className="absolute top-1 left-1 bg-blue-600 text-white text-[8px] font-mono px-1.5 py-0.2 rounded font-black uppercase">
                            {lecture.category}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0 pr-6 flex flex-col justify-between">
                          <div>
                            <h5 className="text-xs font-bold text-slate-200 line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">
                              {lecture.title}
                            </h5>
                            <span className="block text-[9px] text-slate-500 font-mono mt-1 truncate max-w-[150px]">
                              {lecture.videoUrl}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono mt-2">
                            <span>{lecture.views}</span>
                            <span>{lecture.timeAgo}</span>
                          </div>
                        </div>

                        {/* Delete action button */}
                        <button
                          type="button"
                          onClick={() => {
                            setDeleteConfirm({
                              id: lecture.id,
                              type: "video",
                              title: lecture.title,
                            });
                          }}
                          className="absolute right-2 top-2 p-1.5 bg-red-950/40 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-red-300 rounded-lg transition-all cursor-pointer shadow opacity-100"
                          title="Xoá bài giảng"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* TAB 2: BLOG MANAGEMENT (WITH DEVICE UPLOAD IMAGES) */}
          {activeTab === "blogs" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left animate-fade-in">
              {/* Left Form: Publish/Edit Blog Post */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <h4 className="text-sm font-bold text-slate-100 font-display uppercase tracking-tight">
                    {editingBlogId
                      ? "Sửa bài viết cẩm nang"
                      : "Đăng Bài Viết Toán Học Mới"}
                  </h4>
                </div>

                {blogSuccess && (
                  <div className="p-3 bg-emerald-500/15 border border-emerald-500/25 rounded-xl text-center text-xs text-emerald-400 font-sans">
                    🎉{" "}
                    {editingBlogId
                      ? "Đã lưu thay đổi bài viết thành công!"
                      : "Đã xuất bản bài viết cẩm nang toán học thành công!"}
                  </div>
                )}

                <form
                  onSubmit={handlePublishOrUpdateBlog}
                  className="space-y-4"
                >
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      Tiêu đề bài viết
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Bí thuật phân tích đa thức thành nhân tử siêu tốc..."
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                        Phân loại (Category)
                      </label>
                      <select
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none cursor-pointer font-sans"
                      >
                        <option value="Ôn Thi Vào 10">Ôn Thi Vào 10</option>
                        <option value="Phương Pháp Học">Phương Pháp Học</option>
                        <option value="Luyện Thi VSAT">Luyện Thi VSAT</option>
                        <option value="Hình Học Không Gian">
                          Hình Học Không Gian
                        </option>
                        <option value="Hình Học Phẳng">Hình Học Phẳng</option>
                        <option value="Đại Số Lớp 9">Đại Số Lớp 9</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono font-sans">
                        Ảnh nền bài viết
                      </label>

                      <div className="flex flex-col space-y-2">
                        <button
                          type="button"
                          onClick={() =>
                            document
                              .getElementById("blog-image-devices")
                              ?.click()
                          }
                          className="w-full text-center bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-[11px] px-3 py-2.5 rounded-xl cursor-pointer transition-all font-semibold font-sans flex items-center justify-center space-x-1.5"
                        >
                          <Upload className="w-3.5 h-3.5 text-blue-400" />
                          <span>Tải ảnh từ máy tính</span>
                        </button>

                        <input
                          id="blog-image-devices"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result) {
                                  setBlogImageUrl(
                                    event.target.result as string,
                                  );
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {blogImageUrl && (
                    <div className="rounded-xl border border-slate-850 p-1 bg-slate-950 relative aspect-video">
                      <img
                        src={blogImageUrl}
                        alt="Preview blog background"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-emerald-500 text-white font-mono text-[8px] font-black px-2 py-0.5 rounded tracking-wide">
                        ẢNH NỀN ĐÃ ĐỒNG BỘ
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      Tóm tắt bài viết
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Nội dung tóm tắt ngắn truyền động lực học dạng Toán này cho học sinh..."
                      value={blogSummary}
                      onChange={(e) => setBlogSummary(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2 text-xs text-slate-200 outline-none resize-none font-sans"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono font-sans">
                      Hệ bài tập chi tiết (Full Content)
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Trình bày kiến thức chi tiết, đề bài kèm công thức giải nhanh..."
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none resize-none font-sans leading-relaxed text-left"
                    />
                  </div>

                  <div className="flex space-x-3 pt-2">
                    {editingBlogId && (
                      <button
                        type="button"
                        onClick={handleCancelEditBlog}
                        className="w-1/3 bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold py-2.5 text-xs rounded-xl uppercase tracking-wider transition-all cursor-pointer font-sans"
                      >
                        Hủy
                      </button>
                    )}
                    <button
                      type="submit"
                      className={`bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold py-2.5 text-xs rounded-xl shadow-lg shadow-blue-600/20 uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 font-sans ${
                        editingBlogId ? "w-2/3" : "w-full"
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>
                        {editingBlogId ? "Lưu thay đổi" : "Đăng bài viết"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Side: Scrollable articles list */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h4 className="text-sm font-bold text-slate-100 font-display uppercase tracking-tight text-left">
                  Danh sách bài cẩm nang ôn tập ({blogs.length} bài viết học tập
                  thực tế)
                </h4>

                <div className="space-y-3.5 max-h-[64vh] overflow-y-auto pr-1">
                  {blogs.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 italic font-sans text-xs">
                      Không có bài viết cẩm nang toán học nào. Hãy đăng tải bài
                      viết đầu tiên bên trái!
                    </div>
                  ) : (
                    blogs.map((b) => (
                      <div
                        key={b.id}
                        className="p-3 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between text-left group hover:border-slate-700 transition-all font-sans"
                      >
                        <div className="flex items-center space-x-3.5 overflow-hidden">
                          <img
                            src={b.imageUrl}
                            alt={b.title}
                            className="w-12 h-12 object-cover rounded-xl bg-slate-900 shadow-inner flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="space-y-1 min-w-0">
                            <span className="inline-block text-[8px] font-extrabold px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full uppercase tracking-widest font-mono">
                              {b.category}
                            </span>
                            <h5 className="text-xs font-bold text-white line-clamp-1 leading-tight group-hover:text-blue-400 transition-colors truncate">
                              {b.title}
                            </h5>
                            <p className="text-[10px] text-slate-500 line-clamp-1 font-sans truncate">
                              {b.summary}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 flex-shrink-0 ml-3 select-none">
                          <button
                            type="button"
                            onClick={() => handleEditBlogClick(b)}
                            className="p-1.5 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/20 rounded-lg transition-all cursor-pointer"
                            title="Sửa bài viết"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-3.5 h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDeleteConfirm({
                                id: b.id,
                                type: "blog",
                                title: b.title,
                              });
                              if (false) {
                                onDeleteBlog(b.id);
                              }
                            }}
                            className="p-1.5 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/10 rounded-lg transition-all cursor-pointer"
                            title="Xóa bài viết"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEDICATED DOCUMENT / MATERIAL MANAGER FOR TEACHER */}
          {activeTab === "documents" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left animate-fade-in">
              {/* Left Form: Add Material Sheet */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                  <FileText className="w-5 h-5 text-emerald-500" />
                  <h4 className="text-sm font-bold text-slate-100 font-display uppercase tracking-tight">
                    Đăng Tải Giáo Trình & Tài Liệu Ôn Thi
                  </h4>
                </div>

                {docSuccess && (
                  <div className="p-3 bg-emerald-500/15 border border-emerald-500/25 rounded-xl text-center text-xs text-emerald-400 font-sans">
                    🎉 Tài liệu chuyên khảo đã được đăng tải trực tiếp vào kho
                    dữ liệu đề thi tự học thành công!
                  </div>
                )}

                <div className="bg-slate-950/80 p-4 border border-slate-850 rounded-xl space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                    Bước 1: Chọn tập tài liệu ôn tập từ thiết bị
                  </label>

                  <div className="flex flex-col space-y-2">
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("doc-file-devices")?.click()
                      }
                      className="w-full text-center bg-emerald-505 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-405 text-[11px] px-3.5 py-3 rounded-xl cursor-pointer transition-all font-bold font-sans flex items-center justify-center space-x-1.5"
                    >
                      <Upload className="w-4 h-4 text-emerald-400" />
                      <span>Chọn file đề thi PDF / Giáo trình ZIP</span>
                    </button>

                    <input
                      id="doc-file-devices"
                      type="file"
                      accept=".pdf,.docx,.zip,.rar"
                      className="hidden"
                      onChange={handleDocDeviceFileSelector}
                    />
                  </div>
                  <span className="block text-[8px] text-slate-500 font-mono tracking-wider italic text-center leading-normal">
                    Hỗ trợ file đề dạng PDF, file lưu trữ bài giải ZIP, tài liệu
                    lý thuyết DOCX.
                  </span>
                </div>

                <form onSubmit={handlePublishDocument} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      2. Quản lý Tên tài liệu hiển thị
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Phiếu Đề Thi Học Kỳ 2 Hình Học Không Gian Lớp 12 Nâng Cao"
                      value={docTitle}
                      onChange={(e) => setDocTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="space-y-1.5 text-left col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                        Hệ nhóm bộ đề
                      </label>
                      <select
                        value={docCategory}
                        onChange={(e) => setDocCategory(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2.5 text-[11px] text-slate-300 outline-none cursor-pointer font-sans"
                      >
                        <option value="Toán lớp 9">Toán lớp 9 (Vào 10)</option>
                        <option value="Toán THPT">Toán THPT (Cấp 3)</option>
                        <option value="VSAT">Phác đồ đề VSAT</option>
                        <option value="Chuyên đề">
                          Hình học phẳng / Đại số
                        </option>
                      </select>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                        Đuôi file
                      </label>
                      <select
                        value={docType}
                        onChange={(e) => setDocType(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2.5 text-[11px] text-slate-300 outline-none cursor-pointer font-mono"
                      >
                        <option value="PDF">PDF</option>
                        <option value="ZIP">ZIP</option>
                        <option value="DOCX">DOCX</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      Dung lượng ước tính
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: 4.8 MB hoặc 12.5 MB"
                      value={docSize}
                      onChange={(e) => setDocSize(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-300 outline-none font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold py-3 text-xs rounded-xl shadow-lg shadow-emerald-600/20 uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 font-sans"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Xác nhận đăng tài liệu</span>
                  </button>
                </form>
              </div>

              {/* Right Side: Shared Documents Table list */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h4 className="text-sm font-bold text-slate-100 font-display uppercase tracking-tight text-left">
                  Kho danh mục tài liệu & phác đồ đã phát hành (
                  {documents.length} tập tin học viên tải trực tiếp)
                </h4>

                <div className="space-y-3 max-h-[64vh] overflow-y-auto pr-1">
                  {documents.length === 0 ? (
                    <div className="p-10 text-center text-slate-500 italic font-sans text-xs">
                      Chưa có tập tin tài liệu ôn tập nào được tải lên. Hãy thử
                      chọn file từ thiết bị để đồng bộ!
                    </div>
                  ) : (
                    documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between text-left hover:border-slate-700 transition-all font-sans"
                      >
                        <div className="flex items-center space-x-3.5 overflow-hidden">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono flex-shrink-0 text-xs font-black">
                            {doc.type}
                          </div>
                          <div className="space-y-0.5 min-w-0">
                            <span className="inline-block text-[8px] font-extrabold px-1.5 py-0.2 bg-emerald-555/10 text-emerald-400/90 rounded font-mono uppercase">
                              {doc.category}
                            </span>
                            <h5 className="text-xs font-extrabold text-white line-clamp-1 leading-tight truncate">
                              {doc.title}
                            </h5>
                            <span className="block text-[10px] text-slate-500 font-mono">
                              Dung lượng: {doc.size} • Số lượt tải:{" "}
                              {doc.downloads}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setDeleteConfirm({
                              id: doc.id,
                              type: "document",
                              title: doc.title,
                            });
                            if (false) {
                              onDeleteDocument(doc.id);
                            }
                          }}
                          className="p-2 border border-slate-800 text-slate-450 hover:text-red-405 hover:border-red-500/10 rounded-xl transition-all cursor-pointer ml-3 flex-shrink-0"
                          title="Xóa tài liệu"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Beautiful Glassmorphic Custom Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in select-none">
          <div className="bg-[#0b0e1a] border border-red-500/30 rounded-2xl p-6 max-w-sm w-full text-left shadow-2xl relative">
            <div className="flex items-center space-x-3 text-red-100 mb-4">
              <div className="p-2 bg-red-500/10 rounded-xl text-red-400">
                <Trash2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wider font-display text-slate-100">
                Xác nhận xoá vĩnh viễn
              </h4>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Bạn có chắc chắn muốn xoá vĩnh viễn mục sau đây khỏi hệ thống
                học tập?
              </p>
              <div className="p-3 bg-red-950/20 border border-red-500/10 rounded-xl">
                <p className="text-xs font-bold text-slate-100 font-sans break-words">
                  {deleteConfirm.title}
                </p>
                <p className="text-[9px] text-red-400 font-mono mt-1.5 uppercase tracking-wider">
                  Phân loại:{" "}
                  {deleteConfirm.type === "video"
                    ? "Bài giảng video"
                    : deleteConfirm.type === "blog"
                      ? "Bài viết cẩm nang"
                      : deleteConfirm.type === "document"
                        ? "Tài liệu giáo trình"
                        : "Học viên"}
                </p>
              </div>
              <p className="text-[10px] text-slate-500 italic font-sans leading-tight">
                * Lưu ý: Tác vụ này không thể hoàn tác và sẽ ảnh hưởng trực tiếp
                đến học viên ngay lập tức.
              </p>
            </div>

            <div className="flex space-x-3 mt-6 font-sans">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 text-xs font-bold text-slate-300 bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-850 rounded-lg transition-all cursor-pointer text-center"
              >
                Huỷ bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2 text-xs font-bold text-white bg-red-650 hover:bg-red-650/80 bg-red-600 hover:bg-red-500 border border-red-500 rounded-lg transition-all cursor-pointer text-center"
              >
                Xác nhận xoá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
