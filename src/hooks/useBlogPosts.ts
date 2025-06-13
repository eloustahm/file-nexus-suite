import { useQuery } from '@tanstack/react-query';
import { BLOG_POSTS, BLOG_CATEGORIES, BlogPost } from '@/constants/blog';

// Mock API function - replace with actual API call
const fetchBlogPosts = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return BLOG_POSTS;
};

export const useBlogPosts = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts
  });

  const getPostById = (id: string) => {
    return posts?.find(post => post.id === id);
  };

  const getPostsByCategory = (category: string) => {
    if (category === 'all') return posts;
    return posts?.filter(post => post.category === category) ?? [];
  };

  const getPostsByTag = (tag: string) => {
    return posts?.filter(post => post.tags.includes(tag)) ?? [];
  };

  const getRecentPosts = (limit: number = 3) => {
    return posts?.slice(0, limit) ?? [];
  };

  const getCategories = () => {
    return BLOG_CATEGORIES;
  };

  return {
    posts,
    isLoading,
    getPostById,
    getPostsByCategory,
    getPostsByTag,
    getRecentPosts,
    getCategories
  };
}; 