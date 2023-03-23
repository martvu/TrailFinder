import React, { useEffect, useState } from 'react';
import { usePosts } from '../../hooks/fetchPosts';
import { PostData } from '../../hooks/PostData';
import SortButtons from './SortButtons';
import PostCard from '../PostCard';
import GetRecommended, { recommended, SortOption } from './SortOption';

export default function PostsList() {
  const { recentPostsList, loading } = usePosts();
  const [sortedPosts, setSortedPosts] = useState<PostData[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(recommended);
  const recommendedPosts = GetRecommended();

  useEffect(() => {
    setSortedPosts(selectedSortOption.sort(
      selectedSortOption === recommended ? recommendedPosts : recentPostsList,
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentPostsList, selectedSortOption]);

  return (
    <div className="w-full h-full relative">
      <SortButtons
        selectedSortOption={selectedSortOption}
        setSelectedSortOption={setSelectedSortOption}
      />
      { loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <i className="mt-20 fa-solid fa-spinner fa-xl animate-spin" />
        </div>
      )
        : sortedPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
