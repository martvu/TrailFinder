import React, { useState } from 'react';

interface SortOption {
  text: string;
  icon: string;
}

export default function SortButtons() {
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>();
  /* Sorting options */
  const recommended: SortOption = {
    text: 'Recommended',
    icon: 'fa-solid fa-fire',
  };
  const mostLiked: SortOption = {
    text: 'Most Liked',
    icon: 'fa-solid fa-heart',
  };
  const recent: SortOption = {
    text: 'Recent',
    icon: 'fa-solid fa-clock',
  };
  const alphabetical: SortOption = {
    text: 'A-Z',
    icon: 'fa-solid fa-sort-alpha-down',
  };
  const sortOptions = [recommended, recent, mostLiked, alphabetical];

  return (
    <div className=" flex items-center justify-between min-w-full max-w-full h-12">
      {/* Sort by Button */}
      <div className="">
        <div className="flex flex-row items-center z-10 rounded-lg">
          <span className="pr-2 font-bold">Sort by: </span>
          {sortOptions.map((option) => (
            <div
              key={option.text}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedSortOption(option)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ')) {
                  setSelectedSortOption(option);
                }
              }}
              className={`btn btn-sm btn-outline btn-neutral justify-start px-2 mr-2 ${option === selectedSortOption ? 'btn-active' : ''}`}
            >
              <i className={option.icon} />
              <h3 className="pl-2">{option.text}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
