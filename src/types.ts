export interface Course {
  id: string;
  title: string;
  tag: string;
  bulletPoints: string[];
  lessonsCount: number;
  price: number;
  imageType: 'grade9' | 'highschool' | 'vsat';
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: string;
  timeLeft: string;
  imageUrl: string;
  content?: string;
}

export interface Lecture {
  id: string;
  title: string;
  category: string;
  duration: string;
  imageUrl: string;
  views: string;
  timeAgo: string;
  videoUrl?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  paymentStatus: 'paid' | 'pending' | 'unpaid';
  registerDate: string;
  active: boolean;
}

export interface Comment {
  id: string;
  studentName: string;
  text: string;
  timestamp: string;
  videoTime?: string;
  isTeacher?: boolean;
}
