
export type PostMeta = {
  slug: string;         // ใช้ใน URL เช่น /blog/:slug
  title: string;
  excerpt: string;      // สำหรับหน้า index
  date: string;         // ISO string e.g., '2025-08-15'
  cover?: string;       // รูปหัวเรื่อง
  category: string;     // หมวดหลัก
  tags?: string[];
  author?: { name: string; avatar?: string };
  source: string;       // path ไฟล์ markdown ใน public เช่น '/blog/hello-world.md'
  published?: boolean;  // ซ่อน/แสดงโพสต์
};

export const POSTS: PostMeta[] = [
  {
    slug: 'hello-world',
    title: 'Hello, Blog — ปักหมุดพื้นที่เล่าเทคโนโลยีและการทำแพลตฟอร์ม',
    excerpt: 'เหตุผลที่เราอยากเขียน แชร์ประสบการณ์จริงในการทำเว็บ/แอป/ระบบองค์กร เทคนิคที่ใช้ได้พรุ่งนี้เช้า ไม่ใช่แค่ทฤษฎีสวยๆ',
    date: '2025-08-16',
    cover: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
    category: 'Announcement',
    tags: ['product', 'platform', 'dev'],
    author: { name: 'NueaTech Team', avatar: '/images/aekkachai.jpg' },
    source: '/blog/hello-world.md',
    published: true,
  },
  {
    slug: 'core-web-vitals-in-practice',
    title: 'Core Web Vitals แบบบ้านๆ แต่ทำจริง: LCP, CLS, INP ให้ผ่านแบบไม่เดา',
    excerpt: 'สรุปวิธีทำคะแนนผ่านจากเคสจริง ตั้งแต่ภาพ hero ไปจนถึง hydration, lazy loading, และ edge caching',
    date: '2025-08-17',
    cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
    category: 'Web Performance',
    tags: ['web', 'performance', 'seo'],
    author: { name: 'NueaTech Team' },
    source: '/blog/cwv-practical.md',
    published: true,
  },
];

