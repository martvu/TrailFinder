import React, { useState } from 'react';

interface SortOption {
  text: string;
  icon: string;
  onClick: () => void;
}

type SortButtonsProps = {
  onSortBy: (value: string) => void;
};

export default function SortButtons({ onSortBy }: SortButtonsProps) {
  /* Sorting options */
  const recommended: SortOption = {
    text: 'Recommended',
    icon: 'fa-solid fa-fire',
    onClick: () => { onSortBy('Recommended'); },
  };
  const mostLiked: SortOption = {
    text: 'Most Liked',
    icon: 'fa-solid fa-heart',
    onClick: () => { onSortBy('Most Liked'); },
  };
  const recent: SortOption = {
    text: 'Recent',
    icon: 'fa-solid fa-clock',
    onClick: () => { onSortBy('Recent Posts'); },
  };
  const alphabetical: SortOption = {
    text: 'A-Z',
    icon: 'fa-solid fa-sort-alpha-down',
    onClick: () => { onSortBy('Alphabetical'); },
  };

  const sortOptions = [recommended, recent, mostLiked, alphabetical];
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(recent);

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
              onClick={() => { option.onClick(); setSelectedSortOption(option); }}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ')) {
                  setSelectedSortOption(option);
                }
              }}
              className={`btn btn-sm btn-outline btn-neutral justify-start px-2 mr-2 ${option.text === selectedSortOption.text ? 'btn-active' : ''}`}
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
