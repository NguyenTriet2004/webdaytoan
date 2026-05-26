import { Course, BlogPost, Lecture } from './types';

export const FEATURES = [
  {
    id: 'feat-1',
    iconName: 'Video',
    title: 'Video Bài Giảng HD',
    description: 'Hàng trăm video bài giảng chất lượng cao, chia thành mục nhỏ dễ học.'
  },
  {
    id: 'feat-2',
    iconName: 'FileText',
    title: 'Tài Liệu Độc Quyền',
    description: 'Hệ thống phác đồ học tập, đề thi thử kèm lời giải chi tiết PDF.'
  },
  {
    id: 'feat-3',
    iconName: 'Layers',
    title: 'Lộ Trình Tinh Gọn',
    description: 'Giáo án phân loại rõ ràng từ cơ bản đến nâng cao điểm 9+, 10.'
  },
  {
    id: 'feat-4',
    iconName: 'MessageCircle',
    title: 'Hỏi Đáp 24/7 Trực Tiếp',
    description: 'Thầy Nguyên và đội ngũ trợ giảng hỗ trợ giải đáp nhanh chóng.'
  },
  {
    id: 'feat-5',
    iconName: 'Smartphone',
    title: 'Học Trên Mọi Thiết Bị',
    description: 'Tương thích mượt mà trên điện thoại, máy tính bảng và máy tính.'
  }
];

export const COURSES: Course[] = [
  {
    id: 'course-toan9',
    title: 'Lớp Toán 9 (Ôn Thi Vào 10)',
    tag: 'Chinh phục điểm 9+ tuyển sinh công lập',
    bulletPoints: [
      'Bộ 25 chuyên đề rút gọn biểu thức, hệ phương trình, đồ thị parabol.',
      'Khảo sát phân loại hình học đường tròn nâng cao.',
      'Luyện đề thi tuyển sinh form chuẩn các tỉnh thành toàn quốc.'
    ],
    lessonsCount: 45,
    price: 990000,
    imageType: 'grade9'
  },
  {
    id: 'course-toanthpt',
    title: 'Chương Trình Chuyên Toán THPT',
    tag: 'Bứt phá 12 năm học và Tuyển sinh Đại học',
    bulletPoints: [
      'Giải toán nhanh máy tính cầm tay Casio đại số giải tích.',
      'Sơ đồ tư duy hình học không gian 3D, tọa độ Oxyz.',
      'Toàn tập cực trị hàm số, tích phân, mũ logarit điểm 8, 9, 10.'
    ],
    lessonsCount: 68,
    price: 1200000,
    imageType: 'highschool'
  },
  {
    id: 'course-vsat',
    title: 'Luyện thi VSAT Đánh Giá Tư Duy',
    tag: 'Độc quyền rèn luyện Tư duy Định lượng',
    bulletPoints: [
      'Giải mã cấu trúc đề thi tuyển sinh VSAT mới nhất năm nay.',
      'Phát triển khả năng tư duy logic, thống kê số liệu, đồ thị phức tạp.',
      'Đề khảo sát năng lực thi thử biên soạn sát đề minh họa.'
    ],
    lessonsCount: 54,
    price: 1450000,
    imageType: 'vsat'
  }
];

export const BLOGS: BlogPost[] = [];

export const LECTURES: Lecture[] = [
  {
    id: 'lec-1',
    title: 'Bí quyết thực chiến Rút gọn biểu thức khó - Ôn thi vào lớp 10',
    category: 'Chuyên đề Toán 9',
    duration: '18:45',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
    views: '4.8K',
    timeAgo: '2 ngày trước',
    videoUrl: 'https://www.youtube.com/embed/LsznKPhh1p0'
  },
  {
    id: 'lec-2',
    title: 'Kỹ thuật Ghép Trục giải nhanh cực trị hàm hợp trong 30 giây',
    category: 'Chương trình THPT',
    duration: '22:15',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600',
    views: '3.2K',
    timeAgo: '5 ngày trước',
    videoUrl: 'https://www.youtube.com/embed/m6H-C7V4LpI'
  },
  {
    id: 'lec-3',
    title: 'Chứng minh 4 điểm cùng thuộc một đường tròn - Ôn thi cấp tốc lớp 9',
    category: 'Chuyên đề Toán 9',
    duration: '15:30',
    imageUrl: 'https://images.unsplash.com/photo-1626197031507-c1709955b04a?auto=format&fit=crop&q=80&w=600',
    views: '2.9K',
    timeAgo: '1 tuần trước',
    videoUrl: 'https://www.youtube.com/embed/V6W3JqL-fK8'
  },
  {
    id: 'lec-4',
    title: 'Tư duy định lượng & Giải mã đề minh họa kì thi ĐGQG (VSAT) mới',
    category: 'Luyện thi VSAT',
    duration: '25:40',
    imageUrl: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=600',
    views: '1.7K',
    timeAgo: '1 tuần trước',
    videoUrl: 'https://www.youtube.com/embed/FwV0v8nI_2U'
  }
];

