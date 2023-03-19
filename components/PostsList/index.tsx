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
    if (selectedSortOption === recommended) {
      setSortedPosts(recommendedPosts);
    } else {
      setSortedPosts(selectedSortOption.sort(recentPostsList));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentPostsList, selectedSortOption]);

  /* useEffect(() => {
    setSortedPosts(selectedSortOption.sort(recentPostsList));
  }, [recentPostsList, selectedSortOption]); */
  // eslint-disable-next-line max-len
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
