/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { usePosts } from '../../hooks/fetchPosts';
import { PostData } from '../../hooks/PostData';
import SortButtons from './SortButtons';
import PostCard from '../PostCard';
import GetRecommended, { recommended, SortOption } from './SortOption';
import FilterMenu, {
  FilterOption, noFilter, stop, price, rating,
} from './FilterMenu';

export default function PostsList() {
  const { recentPostsList, loading } = usePosts();
  const [sortedPosts, setSortedPosts] = useState<PostData[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(recommended);
  const recommendedPosts = GetRecommended();
  const [selectedFilterOption, setSelectedFilterOption] = useState<FilterOption>(noFilter);
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(sortedPosts);
  const [stopFilter, setStopFilter] = useState('');
  const [applyFilter, setApplyFilter] = useState(false);
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');
  const [filterOption, setFilterOption] = useState('search');
  const [filterList, setFilterList] = useState([]);
  useEffect(() => {
    setSortedPosts(selectedSortOption.sort(
      selectedSortOption === recommended ? recommendedPosts : recentPostsList,
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentPostsList, selectedSortOption]);

  useEffect(() => {
    setFilteredPosts(sortedPosts);
  }, [sortedPosts]);

  function handleFilterStop() {
    const filter:PostData[] = sortedPosts.filter((post) => post.stops.includes(stopFilter));
    filterList.push(stopFilter);
    setFilteredPosts(filter);
    setApplyFilter(true);
  }

  function handleFilterPrice() {
    const filter:PostData[] = sortedPosts.filter((post) => parseInt(post.price, 10) <= parseInt(maxPrice, 10));
    setFilteredPosts(filter);
    setApplyFilter(true);
  }

  function handleSearch() {
    if (search === '') return;

    let filter:PostData[] = [];
    if (selectedFilterOption === stop) {
      filter = sortedPosts.filter((post) => post.stops.includes(search));
    } else if (selectedFilterOption === price) {
      filter = sortedPosts.filter((post) => parseInt(post.price, 10) <= parseInt(search, 10));
    } else if (selectedFilterOption === rating) {
      filter = sortedPosts.filter((post) => post.rating >= parseInt(search, 10));
    } else {
      filter = sortedPosts.filter((post) => post.stops.includes(search) || post.title.includes(search) || post.description.includes(search));
    }
    setFilteredPosts(filter);
    setApplyFilter(true);
  }
  return (
    <div className="w-full h-full relative">
      <SortButtons
        selectedSortOption={selectedSortOption}
        setSelectedSortOption={setSelectedSortOption}
      />
      <FilterMenu
        selectedFilterOption={selectedFilterOption}
        setSelectedFilterOption={setSelectedFilterOption}
      />
      <span className="mx-3 font-bold">{selectedFilterOption.text}</span>
      <input type="text" placeholder={selectedFilterOption.placeholder} className="input input-sm border border-solid border-secondary bg-neutral" onChange={(e) => setSearch(e.target.value)} />
      <button type="button" onClick={handleSearch} className="btn btn-sm ml-3 btn-outline"> Search</button>
      { loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <i className="mt-20 fa-solid fa-spinner fa-xl animate-spin" />
        </div>
      )
        : !applyFilter ? sortedPosts.map((post) => <PostCard key={post.id} post={post} />) : filteredPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
