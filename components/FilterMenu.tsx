import React, { useEffect, useRef, useState } from 'react';

interface FilterOption {
  text: string;
  onClick?: () => void;
}

export default function FilterMenu() {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [filterBy, setFilterBy] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  /** Sorting options */
  const stop: FilterOption = {
    text: 'Stop',
    onClick: () => setFilterBy('Stop'),
  };
  const price: FilterOption = {
    text: 'Price',
    onClick: () => setFilterBy('Price'),
  };
  const tripLength: FilterOption = {
    text: 'Length',
    onClick: () => setFilterBy('Trip Length'),
  };
  const rating: FilterOption = {
    text: 'Rating',
    onClick: () => setFilterBy('Rating'),
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
      className="px-2 flex items-center justify-row rounded-xl shadow-md min-w-full max-w-full h-12 bg-neutral"
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
        {filterBy}
      </div>

    </div>
  );
}
