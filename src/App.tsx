import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturesList from './components/FeaturesList';
import FeaturedCourses from './components/FeaturedCourses';
import TeachingMethods from './components/TeachingMethods';
import LatestLectures from './components/LatestLectures';
import LatestBlogs from './components/LatestBlogs';
import MoMoPayment from './components/MoMoPayment';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';
import { saveDocumentFile, deleteDocumentFile } from './utils/db';

// Modals
import AuthModal from './components/AuthModal';
import PaymentModal from './components/PaymentModal';
import VideoModal from './components/VideoModal';
import TeacherDashboard from './components/TeacherDashboard';
import LecturesPage from './components/LecturesPage';
import BlogDetailModal from './components/BlogDetailModal';

// Data
import { LECTURES, COURSES, BLOGS } from './data';
import { Course, Lecture, BlogPost, Student } from './types';

export default function App() {
  const [section, setSection] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; phone: string } | null>(null);
  
  // Modals state
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState<Course | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedLectureForVideo, setSelectedLectureForVideo] = useState<Lecture | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isTeacherActive, setIsTeacherActive] = useState(false);
  
  // Blog detail states
  const [selectedBlogForDetail, setSelectedBlogForDetail] = useState<BlogPost | null>(null);
  const [isBlogDetailOpen, setIsBlogDetailOpen] = useState(false);

  // Database of lectures (can be appended dynamically by Teacher Console)
  const [allLectures, setAllLectures] = useState<Lecture[]>(() => {
    const saved = localStorage.getItem('thaynguyentoan_lectures');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          // Migrate old files, empty values, or broken key values to prevent "Video unavailable" errors
          const migrated = parsed.map((item: any) => {
            const defaultUrls: Record<string, string> = {
              'lec-1': 'https://www.youtube.com/embed/LsznKPhh1p0',
              'lec-2': 'https://www.youtube.com/embed/m6H-C7V4LpI',
              'lec-3': 'https://www.youtube.com/embed/V6W3JqL-fK8',
              'lec-4': 'https://www.youtube.com/embed/FwV0v8nI_2U',
            };
            const isMockOrBroken = !item.videoUrl || 
                                   item.videoUrl.trim() === '2' || 
                                   item.videoUrl.trim() === '' || 
                                   item.videoUrl.includes('oceans.mp4') || 
                                   item.videoUrl.includes('sintel') || 
                                   item.videoUrl.includes('bunny') ||
                                   item.videoUrl.includes('commondatastorage.googleapis.com');
            if (isMockOrBroken) {
              return {
                ...item,
                videoUrl: defaultUrls[item.id] || 'https://www.youtube.com/embed/LsznKPhh1p0'
              };
            }
            return item;
          });
          return migrated;
        }
      } catch (e) {
        // ignore
      }
    }
    return LECTURES;
  });

  // Dynamic state for blog posts list
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('thaynguyentoan_blogs');
    if (saved) return JSON.parse(saved);
    return BLOGS.map(blog => {
      let content = '';
      if (blog.id === 'blog-1') {
        content = `### Bí quyết thực chiến: Rút gọn biểu thức chứa căn thức và các bài toán phụ tuyển sinh vào 10\n\nTrong cấu trúc đề thi tuyển sinh môn Toán vào lớp 10, dạng bài toán về **rút gọn biểu thức đại số** luôn chiếm trọn vẹn 2.0 điểm đầu tiên của đề và là nơi học sinh dễ rơi vào bẫy trình bày nhất.\n\n#### 1. Nguyên tắc giải hệ thức chứa căn\nCho biểu thức đại số chứa căn thức bất kỳ. Hãy thực hiện đầy đủ các bước phác đồ:\n- **Đặt điều kiện xác định (ĐKXĐ):** Biểu thức dưới căn $\\ge 0$, biểu thức dưới mẫu $\\ne 0$.\n- **Quy đồng mẫu thức chung:** Phân tích tử và mẫu thành nhân tử trước để triệt tiêu phần dư thừa tối đa.\n- **Kiểm tra và kết hợp:** Luôn đối chiếu tập giá trị nghiệm tìm được với ĐKXĐ gốc lúc đầu để ghi chép chính xác.\n\n#### 2. Định lý Bổ sung & Các mẹo ôn luyện\nLuôn chú ý dạng biến đổi $A \\le B$ hoặc tìm giá trị nguyên của biểu thức bằng cách sử dụng bất đẳng thức Cauchy hoặc chặn miền giá trị của biểu thức.`;
      } else if (blog.id === 'blog-2') {
        content = `### Kỹ thuật Ghép Trục & Các bí kíp giải toán trắc nghiệm siêu tốc 30 giây\n\nGiải toán trắc nghiệm THPT không chỉ cần đúng mà cần **cực kỳ nhanh**. Kỹ thuật Ghép trục (độc quyền bởi cộng đồng giáo viên ôn thi nâng cao) được xem là vũ khí tối thượng cho các bài toán cực trị hàm hợp f(u(x)).\n\n#### Phác đồ các bước triển khai Ghép Trục:\n- **Bước 1:** Khảo sát và lập bảng biến thiên của hàm lõi $u = u(x)$ trên tập xác định tương ứng.\n- **Bước 2:** Xác định các điểm cực trị trung gian của đồ thị mẹ $f(x)$ nằm trong khoảng biến thiên của $u(x)$.\n- **Bước 3:** Ghép các giá trị tương ứng vào dòng biến thiên của $f(u)$ để vẽ trực tiếp đồ thị f(u) mà không cần lấy đạo hàm hay xét dấu phức tạp.`;
      } else {
        content = `### Bí kíp thực chiến bứt phá điểm số môn Toán kỳ thi VSAT lớp 12\n\nTư duy định lượng đề thi Đánh giá năng lực tư duy (VSAT) yêu cầu khả năng phân tích biểu đồ, giải quyết tình huống thực tế và so sánh số lượng logic một cách nhanh nhạy.\n\n#### Hướng dẫn ôn thi hiệu quả:\n- Làm quen sớm với cấu trúc so sánh đại lượng (Nặng hơn - Nhẹ hơn, Lớn hơn - Bé hơn) thay vì giải phương trình truyền thống.\n- Phát triển kỹ năng đọc biểu đồ dạng tròn, cột, đường xu thế.\n- Ôn tập kỹ các chủ đề Toán tài chính, bài toán năng suất dòng chảy thực tế.`;
      }
      return { ...blog, content };
    });
  });

  // Dynamic documents list managed by Thầy
  const [documents, setDocuments] = useState<any[]>(() => {
    const saved = localStorage.getItem('thaynguyentoan_documents');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'doc-default-1',
        title: 'Phác đồ 30 ngày Bứt phá Điểm Hình học Không gian ôn thi lớp 10',
        category: 'Toán lớp 9',
        type: 'PDF',
        size: '3.5 MB',
        downloads: '425'
      },
      {
        id: 'doc-default-2',
        title: 'Bảng phản xạ công thức tính nhanh Đạo hàm Hàm mũ Logarit',
        category: 'Chương trình THPT',
        type: 'DOCX',
        size: '1.2 MB',
        downloads: '298'
      },
      {
        id: 'doc-default-3',
        title: 'Đề thi thử Tư duy Định lượng Đề khảo sát VSAT năm học 2026',
        category: 'Luyện thi VSAT',
        type: 'XLSX',
        size: '850 KB',
        downloads: '185'
      }
    ];
  });

  // Student list managed by Thầy
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('thaynguyentoan_students');
    return saved ? JSON.parse(saved) : [];
  });

  // Persists local caches
  useEffect(() => {
    localStorage.setItem('thaynguyentoan_lectures', JSON.stringify(allLectures));
  }, [allLectures]);

  useEffect(() => {
    localStorage.setItem('thaynguyentoan_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('thaynguyentoan_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('thaynguyentoan_students', JSON.stringify(students));
  }, [students]);

  const handleAddBlog = (newBlog: Omit<BlogPost, 'id' | 'timeLeft'>) => {
    const blogToAppend: BlogPost = {
      ...newBlog,
      id: `blog-added-${Date.now()}`,
      timeLeft: 'Vừa xong'
    };
    setBlogs(prev => [blogToAppend, ...prev]);
  };

  const handleUpdateBlog = (updatedBlog: BlogPost) => {
    setBlogs(prev => prev.map(b => b.id === updatedBlog.id ? updatedBlog : b));
  };

  const handleDeleteBlog = (id: string) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  // Documents action handlers
  const handleAddDocument = (newDoc: { title: string; category: string; type: string; size: string; downloads: string; fileData?: string; originalName?: string }) => {
    const docId = `doc-added-${Date.now()}`;
    
    // Save heavy binary base64 fileData to IndexedDB securely
    if (newDoc.fileData) {
      saveDocumentFile(docId, newDoc.fileData);
    }

    // Exclude fileData payload from state metadata so local storage does not crash
    const { fileData, ...metadata } = newDoc;
    const docToAppend = {
      ...metadata,
      id: docId
    };
    setDocuments(prev => [...prev, docToAppend]);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    deleteDocumentFile(id);
  };

  // Students action handlers
  const handleUpdatePaymentStatus = (id: string, newStatus: 'paid' | 'pending' | 'unpaid') => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, paymentStatus: newStatus } : s));
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const handleToggleStudentActive = (id: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const handleSubmitRegistration = (registration: { name: string; phone: string; email: string; grade: string }) => {
    const newStudent: Student = {
      id: `student-reg-${Date.now()}`,
      name: registration.name,
      phone: registration.phone,
      email: registration.email,
      grade: registration.grade,
      paymentStatus: 'pending',
      registerDate: new Date().toLocaleDateString('vi-VN'),
      active: true
    };
    setStudents(prev => [newStudent, ...prev]);
  };

  // Retrieve user session from localStorage if exists
  useEffect(() => {
    const savedUser = localStorage.getItem('thaynguyentoan_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleAuthSuccess = (user: { name: string; email: string; phone: string }) => {
    setCurrentUser(user);
    localStorage.setItem('thaynguyentoan_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('thaynguyentoan_user');
    setSection('home');
  };

  // Nav actions
  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'about') {
      alert('ℹ️ VỀ THẦY NGUYỄN:\n\n- Thầy Nguyễn (Nguyễn Khoa Nguyên) là Thạc sĩ Toán ứng dụng với hơn 8 năm giảng dạy.\n- Slogan: "Tâm huyết - Tận tụy - Vững vàng".\n- Chuyên bồi dưỡng học sinh lớp 9 bứt phá vào 10 chuyên lớp chọn và chuẩn bị kiến thức thi Đánh giá tư duy VSAT.');
      return;
    }

    if (sectionId === 'documents') {
      // Smooth scroll to Teaching Methods document section
      setSection('home');
      setTimeout(() => {
        const teachingSection = document.getElementById('teaching-methods-section');
        if (teachingSection) {
          teachingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
      return;
    }

    if (sectionId === 'lectures') {
      if (!currentUser) {
        setAuthMode('login');
        setIsAuthOpen(true);
        alert('🔒 KHOÁ HỌC GIÁO TRÌNH BẢN QUYỀN:\n\nVui lòng đăng nhập hoặc ký danh học viên trước để mở khóa kho tư liệu bài giảng toàn cảnh của Thầy Nguyên nhé!');
        return;
      }
      setSection('lectures');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSection('home');

    // Smooth scroll triggers for specific landmarks
    setTimeout(() => {
      let targetElement: HTMLElement | null = null;
      if (sectionId === 'courses') {
        targetElement = document.getElementById('courses-section');
      } else if (sectionId === 'blogs') {
        targetElement = document.getElementById('blogs-section');
      } else if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // Select video
  const handleSelectLecture = (lecture: Lecture) => {
    setSelectedLectureForVideo(lecture);
    setIsVideoOpen(true);
  };

  // Select course trigger payment
  const handleSelectCourse = (course: Course) => {
    if (!currentUser) {
      setAuthMode('login');
      setIsAuthOpen(true);
      alert('🔒 ĐĂNG KÝ KHÓA HỌC:\n\nVui lòng đăng ký/đăng nhập tài khoản học viên trước để hệ thống liên kết khớp tiến độ học tập và lập hóa đơn học phí của bạn chính xác nhé!');
      return;
    }
    setSelectedCourseForPayment(course);
    setIsPaymentOpen(true);
  };

  const handleAddLecture = (newLecture: Omit<Lecture, 'id' | 'views' | 'timeAgo'>) => {
    const randomizedViews = Math.floor(Math.random() * 5 + 1) + '.1K lượt xem';
    const lectureToAppend: Lecture = {
      ...newLecture,
      id: `lec-added-${Date.now()}`,
      views: randomizedViews,
      timeAgo: 'Vừa xong'
    };
    setAllLectures(prev => [lectureToAppend, ...prev]);
  };

  const handleDeleteLecture = (id: string) => {
    setAllLectures(prev => prev.filter(l => l.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#060913] text-white flex flex-col font-sans">
      
      {/* Header Navigation Section */}
      <Header 
        onNavClick={handleNavClick} 
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setIsAuthOpen(true);
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenTeacherDashboard={() => {
          if (currentUser?.email === 'triet5509@gmail.com') {
            setIsTeacherActive(true);
          } else {
            alert('🔒 PHÂN QUYỀN QUẢN TRỊ: Chức năng này chỉ cấp phép cho tài khoản quản trị triet5509@gmail.com!');
          }
        }}
      />

      {/* Main Pages */}
      {section === 'home' ? (
        <main className="flex-1">
          {/* Hero Banner Section */}
          <Hero 
            onExploreCourses={() => handleNavClick('courses')}
            onPlayIntro={() => {
              handleSelectLecture({
                id: 'lec-intro',
                title: 'Chào mừng bạn đến với Nền Tảng Học Toán Trực Tuyến Thầy Nguyên',
                category: 'Giới thiệu',
                views: '10K lượt xem',
                timeAgo: 'Hôm nay',
                duration: '02:30',
                imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600',
                videoUrl: 'https://www.youtube.com/embed/LsznKPhh1p0'
              });
            }}
          />

          {/* Features Advantage bar */}
          <FeaturesList />

          {/* Triple Courses display */}
          <FeaturedCourses 
            onSelectCourse={handleSelectCourse}
            onExploreAll={() => handleNavClick('courses')}
          />

          {/* Core Interactive Chalkboard Methods */}
          <TeachingMethods 
            onSelectLecture={handleSelectLecture}
            currentUser={currentUser}
            documents={documents}
          />

          {/* Latest Video lectures grid */}
          <LatestLectures 
            onSelectLecture={handleSelectLecture}
            onExploreLectures={() => handleNavClick('lectures')}
            lectures={allLectures.slice(0, 4)}
          />

          {/* Blog posts section */}
          <LatestBlogs 
            blogs={blogs}
            onSelectBlog={(blog: BlogPost) => {
              setSelectedBlogForDetail(blog);
              setIsBlogDetailOpen(true);
            }}
            onExploreBlogs={() => handleNavClick('blogs')}
          />

          {/* Smartphone MoMo Payment Checkout section */}
          <MoMoPayment 
            onInitiatePayment={() => {
              if (!currentUser) {
                setAuthMode('login');
                setIsAuthOpen(true);
                alert('Vui lòng đăng nhập trước khi kích hoạt thanh toán học tập nhé!');
                return;
              }
              const defaultCourse = COURSES[1]; // THPT Quốc gia
              setSelectedCourseForPayment(defaultCourse);
              setIsPaymentOpen(true);
            }}
          />

          {/* CTA Banner Section */}
          <CTABanner 
            onRegisterNow={() => {
              if (currentUser) {
                handleNavClick('courses');
              } else {
                setAuthMode('register');
                setIsAuthOpen(true);
              }
            }}
          />
        </main>
      ) : (
        /* Video Lectures Page rendering when student logs in successfully */
        <main className="flex-grow">
          <LecturesPage 
            lectures={allLectures}
            onSelectLecture={handleSelectLecture}
          />
        </main>
      )}

      {/* Footer Navigation Section */}
      <Footer onNavClick={handleNavClick} />

      {/* Auth Modal Popup */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Payment Processing Gateway Modal with custom Zalo integration */}
      <PaymentModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        courses={COURSES}
        selectedCourse={selectedCourseForPayment}
        currentUser={currentUser}
        onSubmitRegistration={handleSubmitRegistration}
      />

      {/* DRM Secure Video Modal */}
      <VideoModal 
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title={selectedLectureForVideo?.title || 'Đột phá điểm 9+: Chinh phục đồ thị hàm số tuyệt đối'}
        category={selectedLectureForVideo?.category || 'Toán THPT'}
        views={selectedLectureForVideo?.views}
        timeAgo={selectedLectureForVideo?.timeAgo}
        videoUrl={selectedLectureForVideo?.videoUrl}
        currentUser={currentUser}
      />

      {/* Master Teacher Admin Console Dashboard Popup */}
      {isTeacherActive && currentUser?.email === 'triet5509@gmail.com' && (
        <TeacherDashboard 
          lectures={allLectures}
          onAddLecture={handleAddLecture}
          onDeleteLecture={handleDeleteLecture}
          blogs={blogs}
          onAddBlog={handleAddBlog}
          onUpdateBlog={handleUpdateBlog}
          onDeleteBlog={handleDeleteBlog}
          documents={documents}
          onAddDocument={handleAddDocument}
          onDeleteDocument={handleDeleteDocument}
          students={students}
          onUpdatePaymentStatus={handleUpdatePaymentStatus}
          onDeleteStudent={handleDeleteStudent}
          onToggleStudentActive={handleToggleStudentActive}
          onClose={() => setIsTeacherActive(false)}
        />
      )}

      {/* Blog Detail Modal */}
      <BlogDetailModal 
        isOpen={isBlogDetailOpen}
        onClose={() => setIsBlogDetailOpen(false)}
        blog={selectedBlogForDetail}
      />

    </div>
  );
}
