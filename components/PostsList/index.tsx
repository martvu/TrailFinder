import React, { useEffect, useState } from 'react';
import { usePosts } from '../../hooks/fetchPosts';
import { PostData } from '../../hooks/PostData';
import SortButtons from './SortButtons';
import PostCard from '../PostCard';
import { recent, SortOption } from './SortOption';

export default function PostsList() {
  const { recentPostsList, loading } = usePosts();
  const [sortedPosts, setSortedPosts] = useState<PostData[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(recent);

  useEffect(() => {
    setSortedPosts(selectedSortOption.sort(recentPostsList));
  }, [recentPostsList, selectedSortOption]);

  return (
    <div className="w-full h-full">
      <SortButtons
        selectedSortOption={selectedSortOption}
        setSelectedSortOption={setSelectedSortOption}
      />
      { loading ? <h1 className="">Loading...</h1>
        : sortedPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
