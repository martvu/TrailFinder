import { PostData } from 'hooks/PostData';
import React, { useEffect, useRef, useState } from 'react';

interface FilterOption {
  text: string;
  input?: JSX.Element;
  filter?: () => void;
  onClick?: () => void;
}

const noFilter: FilterOption = {
  text: '',
};

export default function FilterMenu() {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [filterBy, setFilterBy] = useState<FilterOption>(noFilter);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [stopFilter, setStopFilter] = useState('');

  /** Sorting options */
  const stop: FilterOption = {
    text: 'Stop',
    input: <input type="text" onChange={(e) => { setStopFilter(e.target.value); }} className="input input-sm input-bordered mx-2 bg-neutral w-20" />,
    filter: () => {
      const filtered = posts.filter((post: PostData[]) => post.stops.includes(stopFilter));
      setFilteredPosts(filtered);
      setFilterBy(stop);
    },
    onClick: () => setFilterBy(stop),
  };

  const price: FilterOption = {
    text: 'Price',
    input: <span>
      <input type="number" placeholder="min" className="input input-sm input-bordered ml-2 bg-neutral w-20" />
      {' '}
      <input type="number" placeholder="max" className="input input-sm input-bordered ml-2 bg-neutral w-20" />
           </span>,
    onClick: () => setFilterBy(price),
  };
  const tripLength: FilterOption = {
    text: 'Length',
    input: <span><input type="text" placeholder="days" className="input input-sm input-bordered ml-2 bg-neutral w-20" /></span>,
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
      {/** Sort by Button */}
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
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <div
                  key={option.text}
                  onClick={option.onClick}
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
        <span>{filterBy.input}</span>
        <button onClick={filterBy.filterFunc} type="button" className="btn btn-xs btn-primary mx-2">Add Filter</button>
      </div>

    </div>
  );
}
