import React, { useEffect, useState } from 'react';
import { usePosts } from '../../hooks/fetchPosts';
import { PostData } from '../../hooks/PostData';
import SortButtons from './SortButtons';
import PostCard from '../PostCard';
import { recent, SortOption } from './SortOption';
import FilterMenu, { FilterOption, noFilter } from './FilterMenu';

export default function PostsList() {
  const { recentPostsList, loading } = usePosts();
  const [sortedPosts, setSortedPosts] = useState<PostData[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(recent);
  const [selectedFilterOption, setSelectedFilterOption] = useState<FilterOption>(noFilter);
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);

  useEffect(() => {
    setSortedPosts(selectedSortOption.sort(recentPostsList));
  }, [recentPostsList, selectedSortOption]);

  useEffect(() => {
    setFilteredPosts(selectedFilterOption.filter(sortedPosts));
  }, [sortedPosts, selectedFilterOption]);

  return (
    <div className="w-full h-full">
      <SortButtons
        selectedSortOption={selectedSortOption}
        setSelectedSortOption={setSelectedSortOption}
      />
      <FilterMenu
        selectedFilterOption={selectedFilterOption}
        setSelectedFilterOption={setSelectedFilterOption}
      />
      { loading ? <h1 className="">Loading...</h1>
        : filteredPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
