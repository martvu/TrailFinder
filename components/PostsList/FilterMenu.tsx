import { PostData } from 'hooks/PostData';
import React, { useEffect, useRef, useState } from 'react';

export interface FilterOption {
  text: string;
  placeholder: string;
}

export const noFilter: FilterOption = {
  text: '',
  placeholder: '',
};

export const stop: FilterOption = {
  text: 'Stop',
  placeholder: 'stop',
};

export const price: FilterOption = {
  text: 'Price',
  placeholder: 'max price',
};
export const tripLength: FilterOption = {
  text: 'Length',
  placeholder: 'max length',
};
export const rating: FilterOption = {
  text: 'Rating',
  placeholder: 'min rating',
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
      className="inline-block relative"
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
    </div>
  );
}
