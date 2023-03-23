/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { usePosts } from '../../hooks/fetchPosts';
import { PostData } from '../../hooks/PostData';
import SortButtons from './SortButtons';
import PostCard from '../PostCard';
import GetRecommended, { recommended, SortOption } from './SortOption';
import SearchBar from './SearchBar';

export default function PostsList() {
  const { recentPostsList, loading } = usePosts();
  const [sortedPosts, setSortedPosts] = useState<PostData[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(recommended);
  const recommendedPosts = GetRecommended();
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(sortedPosts);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSortedPosts(selectedSortOption === recommended ? recommendedPosts : selectedSortOption.sort(recentPostsList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentPostsList, selectedSortOption]);

  useEffect(() => {
    setFilteredPosts(sortedPosts);
  }, [sortedPosts]);

  function handleSearch() {
    if (search === '') return;
    const filter = sortedPosts.filter(
      (post) => post.stops.some((stop) => stop.toLowerCase().includes(search.toLowerCase()))
      || post.title.toLowerCase().includes(search.toLowerCase())
      || post.description.toLowerCase().includes(search.toLowerCase())
      || post.length.toLowerCase().includes(search.toLowerCase())
      || post.price.toLowerCase().includes(search.toLowerCase())
      || post.rating.toString().toLowerCase().includes(search.toLowerCase())
      || post.username.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredPosts(filter);
  }
  return (
    <div className="w-full h-full relative">
      <div className=" flex flex-col md:flex-row justify-between min-w-full max-w-full h-12">
        <SortButtons
          selectedSortOption={selectedSortOption}
          setSelectedSortOption={setSelectedSortOption}
        />
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <SearchBar setSearch={setSearch} handleSearch={handleSearch} />
      </div>
      { loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <i className="mt-20 fa-solid fa-spinner fa-xl animate-spin" />
        </div>
      )
        : filteredPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
