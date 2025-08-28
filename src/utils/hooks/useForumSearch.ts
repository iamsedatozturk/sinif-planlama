import { ForumCategory, ForumPost, ForumTopic } from '@/proxy/forum/forum';
import { useState, useEffect, useMemo } from 'react';

interface UseSearchProps {
  categories: ForumCategory[];
  topics: ForumTopic[];
  posts: ForumPost[];
}

interface SearchResult {
  categories: ForumCategory[];
  topics: ForumTopic[];
  posts: ForumPost[];
  totalCount: number;
}

export function useForumSearch({ categories, topics, posts }: UseSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult>({
    categories: [],
    topics: [],
    posts: [],
    totalCount: 0
  });

  const performSearch = useMemo(() => {
    if (!searchQuery.trim()) {
      return {
        categories: [],
        topics: [],
        posts: [],
        totalCount: 0
      };
    }

    const query = searchQuery.toLowerCase().trim();

    // Search in categories
    const matchedCategories = categories.filter(category =>
      category.name.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query)
    );

    // Search in topics
    const matchedTopics = topics.filter(topic =>
      topic.title.toLowerCase().includes(query) ||
      topic.content.toLowerCase().includes(query) ||
      topic.authorName.toLowerCase().includes(query)
    );

    // Search in posts
    const matchedPosts = posts.filter(post =>
      post.content.toLowerCase().includes(query) ||
      post.authorName.toLowerCase().includes(query)
    );

    return {
      categories: matchedCategories,
      topics: matchedTopics,
      posts: matchedPosts,
      totalCount: matchedCategories.length + matchedTopics.length + matchedPosts.length
    };
  }, [searchQuery, categories, topics, posts]);

  useEffect(() => {
    setSearchResults(performSearch);
  }, [performSearch]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    clearSearch,
    hasResults: searchResults.totalCount > 0
  };
}