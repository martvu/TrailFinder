import { PostData } from 'hooks/PostData';
import React, { useEffect, useRef, useState } from 'react';

export interface FilterOption {
  text: string;
  placeholder: string;
  filter: (posts: PostData[]) => PostData[];
  onClick?: () => void;
}

export const noFilter: FilterOption = {
  text: '',
  placeholder: '',
  filter: (posts) => posts,
};

type FilterMenuProps = {
  selectedFilterOption: FilterOption;
  setSelectedFilterOption: React.Dispatch<React.SetStateAction<FilterOption>>;
};
export default function FilterMenu({
  selectedFilterOption,
  setSelectedFilterOption,
}: FilterMenuProps) {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [filterBy, setFilterBy] = useState<FilterOption>(noFilter);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [stopFilter, setStopFilter] = useState('Oslo');

  /** Sorting options */
  const stop: FilterOption = {
    text: 'Stop',
    placeholder: 'stop',
    filter: (posts) => [...posts].filter((post) => post.stops.includes(stopFilter)), /* () => {
      const filtered = posts.filter((post: PostData[]) => post.stops.includes(stopFilter));
      setFilteredPosts(filtered);
      setFilterBy(stop); */
    onClick: () => setFilterBy(stop),
  };

  const price: FilterOption = {
    text: 'Price',
    placeholder: 'max price',
    onClick: () => setFilterBy(price),
  };
  const tripLength: FilterOption = {
    text: 'Length',
    placeholder: 'max length',
    onClick: () => setFilterBy(tripLength),
  };
  const rating: FilterOption = {
    text: 'Rating',
    onClick: () => setFilterBy(rating),
  };
  const filterOptions = [stop, price, tripLength, rating];

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
  return (
    <div
      className="px-2 flex items-center justify-row rounded-xl min-w-full max-w-full h-12"
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
                  onClick={() => { setFilterBy(option); setFilterIsOpen(false); }}
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

      {/** Text  */}
      <div className="ml-2 font-bold">
        {filterBy.text}
        {filterBy !== noFilter
        && (
        <span>
          <input type="text" onChange={(e) => setStopFilter(e.target.value)} placeholder={filterBy.placeholder} className="input input-sm input-bordered ml-2 bg-neutral w-20" />
          {stopFilter}
          <button onClick={() => { setSelectedFilterOption(filterBy); }} type="button" className="btn btn-xs btn-primary mx-2">Add Filter</button>
        </span>
        )}
      </div>
    </div>
  );
}
