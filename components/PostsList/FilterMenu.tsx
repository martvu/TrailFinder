import { PostData } from 'hooks/PostData';
import React, { useEffect, useRef, useState } from 'react';

export interface FilterOption {
  text: string;
  placeholder: string;
}

export const none: FilterOption = {
  text: '',
  placeholder: 'Search',
};

export const stop: FilterOption = {
  text: 'Stop',
  placeholder: 'Stop',
};

export const price: FilterOption = {
  text: 'Price',
  placeholder: 'Max price',
};
export const tripLength: FilterOption = {
  text: 'Length',
  placeholder: 'Max trip length',
};
export const rating: FilterOption = {
  text: 'Rating',
  placeholder: 'Min rating',
};
type FilterMenuProps = {
  selectedFilterOption: FilterOption;
  setSelectedFilterOption: React.Dispatch<React.SetStateAction<FilterOption>>;
  sortedPosts: PostData[];
  setApplyFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredPosts: React.Dispatch<React.SetStateAction<PostData[]>>;
};

export function GetFilteredPosts() {
  return [];
}

export default function FilterMenu({
  selectedFilterOption,
  setSelectedFilterOption,
  sortedPosts,
  setApplyFilter,
  setFilteredPosts,
}: FilterMenuProps) {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterOptions = [stop, price, tripLength, rating];
  const [search, setSearch] = useState('');
  const handleClickOutside = (event: MouseEvent | Event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event?.target as Node)) {
      setFilterIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedFilterOption(none);
  }, [setSelectedFilterOption]);

  function handleSearch() {
    if (search === '') {
      return;
    }
    let filter:PostData[] = [];
    if (selectedFilterOption === stop) {
      filter = sortedPosts.filter((post) => post.stops.includes(search));
    } else if (selectedFilterOption === price) {
      filter = sortedPosts.filter((post) => parseInt(post.price, 10) <= parseInt(search, 10));
    } else if (selectedFilterOption === rating) {
      filter = sortedPosts.filter((post) => post.rating >= parseInt(search, 10));
    } else if (selectedFilterOption === tripLength) {
      filter = sortedPosts.filter((post) => parseInt(post.length, 10) <= parseInt(search, 10));
    } else {
      // eslint-disable-next-line max-len
      filter = sortedPosts.filter((post) => post.stops.includes(search) || post.title.includes(search) || post.description.includes(search));
    }
    setFilteredPosts(filter);
    setApplyFilter(true);
  }
  return (
    <div
      className="flex flex-row items-center justify-center w-full h-12 bg-neutral"
    >
      {/** Filter */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex justify-center items-center btn btn-xs btn-outline"
          onClick={() => setFilterIsOpen((prev) => !prev)}
          type="button"
        >
          <span className="mr-2">Filter By</span>
          <i className={!filterIsOpen ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-up'} />
        </button>
        {filterIsOpen
          && (
            <div className="absolute shadow-md top-7 z-10 bg-neutral border border-solid border-secondary rounded-lg w-34">
              {filterOptions.map((option) => (
                // eslint-disable-next-line max-len
                <div
                  key={option.text}
                  role="button"
                  tabIndex={0}
                  onClick={() => { setSelectedFilterOption(option); setFilterIsOpen(false); }}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ')) {
                      setSelectedFilterOption(option);
                    }
                  }}
                  className="btn btn-xs flex btn-outline border-none justify-start px-2"
                >
                  <h3>{option.text}</h3>
                </div>
              ))}
            </div>
          )}
      </div>
      <span className="mx-3 font-bold">{selectedFilterOption.text}</span>
      <input type="text" placeholder={selectedFilterOption.placeholder} className="input input-sm border border-solid border-secondary bg-neutral" onChange={(e) => setSearch(e.target.value)} />
      <button type="button" onClick={handleSearch} className="btn btn-sm ml-3 btn-outline"> Search</button>
    </div>
  );
}
