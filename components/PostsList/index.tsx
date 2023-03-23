/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { usePosts } from '../../hooks/fetchPosts';
import { PostData } from '../../hooks/PostData';
import SortButtons from './SortButtons';
import PostCard from '../PostCard';
import { recent, SortOption } from './SortOption';
import FilterMenu, {
  FilterOption, noFilter, stop, price, rating,
} from './FilterMenu';

export default function PostsList() {
  const { recentPostsList, loading } = usePosts();
  const [sortedPosts, setSortedPosts] = useState<PostData[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(recent);
  const [selectedFilterOption, setSelectedFilterOption] = useState<FilterOption>(noFilter);
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(sortedPosts);
  const [stopFilter, setStopFilter] = useState('');
  const [applyFilter, setApplyFilter] = useState(false);
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');
  const [filterOption, setFilterOption] = useState('search');
  const [filterList, setFilterList] = useState([]);
  useEffect(() => {
    setSortedPosts(selectedSortOption.sort(recentPostsList));
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
    <div className="w-full h-full">
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
      { loading ? <h1 className="">Loading...</h1>
        : !applyFilter ? sortedPosts.map((post) => <PostCard key={post.id} post={post} />) : filteredPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
