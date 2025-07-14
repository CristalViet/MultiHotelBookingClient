import { BlogPost } from '@/components/BlogCard';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Khám phá vẻ đẹp thiên nhiên tại Tuần Châu',
    slug: 'kham-pha-ve-dep-thien-nhien-tuan-chau',
    excerpt: 'Đắm mình trong không gian thiên nhiên tuyệt vời với những trải nghiệm độc đáo tại resort hàng đầu Việt Nam.',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=400&fit=crop',
    author: 'Nguyễn Văn An',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    publishedAt: '2024-01-15',
    readTime: '5 phút đọc',
    category: 'Du lịch',
    tags: ['Thiên nhiên', 'Resort', 'Nghỉ dưỡng'],
    views: 1250,
    likes: 89,
    featured: true
  },
  {
    id: 2,
    title: 'Ẩm thực đặc sắc tại nhà hàng Tuần Châu Resort',
    slug: 'am-thuc-dac-sac-tuan-chau-resort',
    excerpt: 'Thưởng thức những món ăn tinh tế được chế biến bởi đội ngũ đầu bếp chuyên nghiệp với nguyên liệu tươi ngon.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop',
    author: 'Trần Thị Bình',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
    publishedAt: '2024-01-12',
    readTime: '4 phút đọc',
    category: 'Ẩm thực',
    tags: ['Ẩm thực', 'Nhà hàng', 'Hải sản'],
    views: 980,
    likes: 67,
    featured: false
  },
  {
    id: 3,
    title: 'Hoạt động giải trí hấp dẫn cho cả gia đình',
    slug: 'hoat-dong-giai-tri-gia-dinh',
    excerpt: 'Từ công viên nước đến các trò chơi thể thao, Tuần Châu Resort mang đến trải nghiệm giải trí đa dạng.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
    author: 'Lê Minh Tuấn',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    publishedAt: '2024-01-10',
    readTime: '6 phút đọc',
    category: 'Giải trí',
    tags: ['Gia đình', 'Giải trí', 'Thể thao'],
    views: 1540,
    likes: 123,
    featured: true
  },
  {
    id: 4,
    title: 'Spa và thư giãn - Bí quyết sống khỏe',
    slug: 'spa-thu-gian-bi-quyet-song-khoe',
    excerpt: 'Trải nghiệm các liệu pháp spa truyền thống kết hợp hiện đại để tái tạo năng lượng và sức khỏe.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=400&fit=crop',
    author: 'Phạm Thị Lan',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    publishedAt: '2024-01-08',
    readTime: '7 phút đọc',
    category: 'Sức khỏe',
    tags: ['Spa', 'Thư giãn', 'Sức khỏe'],
    views: 890,
    likes: 78,
    featured: false
  },
  {
    id: 5,
    title: 'Khám phá văn hóa địa phương tại Hạ Long',
    slug: 'kham-pha-van-hoa-dia-phuong-ha-long',
    excerpt: 'Tìm hiểu về lịch sử, văn hóa và con người nơi đây qua các tour du lịch văn hóa độc đáo.',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=400&fit=crop',
    author: 'Đỗ Văn Hùng',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    publishedAt: '2024-01-05',
    readTime: '8 phút đọc',
    category: 'Văn hóa',
    tags: ['Văn hóa', 'Lịch sử', 'Hạ Long'],
    views: 1120,
    likes: 95,
    featured: false
  },
  {
    id: 6,
    title: 'Tips cho chuyến du lịch hoàn hảo',
    slug: 'tips-chuyen-du-lich-hoan-hao',
    excerpt: 'Những mẹo hay giúp bạn có một chuyến nghỉ dưỡng tại Tuần Châu Resort thật trọn vẹn và đáng nhớ.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
    author: 'Hoàng Thị Mai',
    authorAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop',
    publishedAt: '2024-01-03',
    readTime: '5 phút đọc',
    category: 'Tips',
    tags: ['Tips', 'Du lịch', 'Kinh nghiệm'],
    views: 2100,
    likes: 156,
    featured: true
  }
];

// Blog post với nội dung đầy đủ cho trang detail
export interface BlogPostWithContent extends BlogPost {
  content: string;
  authorBio: string;
}

export const blogPostsWithContent: BlogPostWithContent[] = [
  {
    ...blogPosts[0],
    authorBio: 'Chuyên viên du lịch với hơn 10 năm kinh nghiệm khám phá các điểm đến tuyệt vời tại Việt Nam.',
    content: `
      <h2>Thiên đường nghỉ dưỡng giữa lòng Hạ Long</h2>
      <p>Tuần Châu Resort không chỉ là một điểm đến nghỉ dưỡng mà còn là nơi bạn có thể hòa mình vào thiên nhiên tuyệt đẹp của vịnh Hạ Long. Với vị trí đắc địa trên đảo Tuần Châu, resort mang đến cho du khách những trải nghiệm không thể quên về vẻ đẹp thiên nhiên hoang sơ và thơ mộng.</p>
      
      <h3>Vẻ đẹp hoang sơ của vịnh Hạ Long</h3>
      <p>Từ resort, du khách có thể ngắm nhìn toàn cảnh vịnh Hạ Long với hàng nghìn hòn đảo đá vôi nghìn năm tuổi. Những tảng đá kỳ vĩ này tạo nên một bức tranh thiên nhiên tuyệt đẹp, đặc biệt vào lúc bình minh và hoàng hôn.</p>
      
      <h3>Hoạt động khám phá thiên nhiên</h3>
      <ul>
        <li><strong>Tour thăm hang động:</strong> Khám phá những hang động kỳ vĩ như hang Thiên Cung, hang Đầu Gỗ</li>
        <li><strong>Kayaking:</strong> Chèo thuyền kayak qua các vùng nước yên tĩnh giữa các hòn đảo</li>
        <li><strong>Đi bộ đường dài:</strong> Trekking trên các con đường mòn xuyên qua rừng nguyên sinh</li>
        <li><strong>Ngắm hoàng hôn:</strong> Thưởng thức màn hoàng hôn tuyệt đẹp từ các điểm ngắm cảnh đẹp nhất</li>
      </ul>
      
      <h3>Khu vườn nhiệt đới trong resort</h3>
      <p>Bên trong resort, du khách sẽ được đắm mình trong khu vườn nhiệt đới với hàng trăm loài thực vật quý hiếm. Không khí trong lành cùng tiếng chim hót véo von tạo nên một không gian thư giãn tuyệt vời.</p>
      
      <h3>Bãi biển riêng tư</h3>
      <p>Resort sở hữu bãi biển riêng với làn nước trong xanh và bờ cát trắng mịn. Đây là nơi lý tưởng để thư giãn, tắm nắng và tham gia các hoạt động thể thao nước.</p>
      
      <blockquote>
        "Tuần Châu Resort là nơi mà thiên nhiên và sự sang trọng hòa quyện một cách hoàn hảo. Mỗi khoảnh khắc ở đây đều mang đến những trải nghiệm đáng nhớ." - Du khách quốc tế
      </blockquote>
      
      <h3>Tips cho chuyến khám phá</h3>
      <ol>
        <li>Mang theo camera để ghi lại những khoảnh khắc đẹp</li>
        <li>Mặc đồ thoải mái và giày thể thao khi tham gia các hoạt động ngoài trời</li>
        <li>Sử dụng kem chống nắng để bảo vệ da</li>
        <li>Tham gia tour vào buổi sáng sớm để tránh đông đúc</li>
        <li>Mang theo nước uống và đồ ăn nhẹ cho các chuyến trekking dài</li>
      </ol>
    `
  },
  {
    ...blogPosts[1],
    authorBio: 'Chuyên gia ẩm thực và nhà phê bình với niềm đam mê khám phá các hương vị độc đáo.',
    content: `
      <h2>Hành trình ẩm thực đặc sắc</h2>
      <p>Tuần Châu Resort tự hào mang đến cho thực khách một hành trình ẩm thực phong phú với những món ăn từ địa phương đến quốc tế, được chế biến bởi đội ngũ đầu bếp tài năng.</p>
      
      <h3>Nhà hàng chính - The Grand Dining</h3>
      <p>Với không gian sang trọng và tầm nhìn ra vịnh Hạ Long, nhà hàng chính phục vụ buffet đa dạng với hơn 100 món ăn từ khắp thế giới.</p>
      
      <h3>Đặc sản hải sản tươi sống</h3>
      <ul>
        <li><strong>Cua Hạ Long:</strong> Cua tươi sống được chế biến theo nhiều phong cách</li>
        <li><strong>Tôm hùm nướng:</strong> Tôm hùm to được nướng với bơ tỏi thơm phức</li>
        <li><strong>Cá mú hấp:</strong> Cá mú tươi hấp với gừng và hành lá</li>
        <li><strong>Sò huyết nướng mỡ hành:</strong> Đặc sản không thể bỏ qua</li>
      </ul>
      
      <h3>Ẩm thực quốc tế</h3>
      <p>Bên cạnh các món Việt Nam, resort còn phục vụ các món ăn quốc tế như Âu, Á với chất lượng đẳng cấp 5 sao.</p>
    `
  },
  {
    ...blogPosts[2],
    authorBio: 'Chuyên viên tổ chức sự kiện và hoạt động giải trí với kinh nghiệm phong phú.',
    content: `
      <h2>Thiên đường giải trí cho mọi lứa tuổi</h2>
      <p>Tuần Châu Resort được thiết kế để mang đến niềm vui cho tất cả thành viên trong gia đình với hàng loạt hoạt động giải trí đa dạng và thú vị.</p>
      
      <h3>Công viên nước Aqua Bay</h3>
      <p>Khu vực công viên nước hiện đại với nhiều trò chơi hấp dẫn dành cho cả trẻ em và người lớn.</p>
      
      <h3>Hoạt động thể thao</h3>
      <ul>
        <li>Tennis, cầu lông, bóng bàn</li>
        <li>Phòng gym hiện đại</li>
        <li>Yoga trên bãi biển</li>
        <li>Các lớp aerobic nước</li>
      </ul>
      
      <h3>Giải trí buổi tối</h3>
      <p>Các chương trình biểu diễn văn nghệ, karaoke, và các hoạt động giải trí khác vào buổi tối.</p>
    `
  }
  // Có thể thêm content cho các post khác...
];

export const categories = ['Tất cả', 'Du lịch', 'Ẩm thực', 'Giải trí', 'Sức khỏe', 'Văn hóa', 'Tips'];

// Helper functions
export const getBlogPostBySlug = (slug: string): BlogPostWithContent | undefined => {
  return blogPostsWithContent.find(post => post.slug === slug) || {
    ...blogPosts.find(post => post.slug === slug)!,
    content: '<p>Nội dung đang được cập nhật...</p>',
    authorBio: 'Tác giả của Tuần Châu Resort'
  } as BlogPostWithContent;
};

export const getRelatedPosts = (currentSlug: string, currentCategory: string, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.category === currentCategory)
    .slice(0, limit);
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getRegularPosts = (): BlogPost[] => {
  return blogPosts.filter(post => !post.featured);
};

export const filterPosts = (posts: BlogPost[], searchQuery: string, selectedCategory: string): BlogPost[] => {
  let filtered = posts;

  // Filter by category
  if (selectedCategory !== 'Tất cả') {
    filtered = filtered.filter(post => post.category === selectedCategory);
  }

  // Filter by search query
  if (searchQuery) {
    filtered = filtered.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  return filtered;
}; 