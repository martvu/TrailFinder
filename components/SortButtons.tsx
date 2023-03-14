import React, { useState } from 'react';

interface SortOption {
  text: string;
  onClick?: () => void;
  isSelected: boolean;
}

export default function SortButtons() {
  const [sortBy, setSortBy] = useState('Recent Posts');

  /* Sorting options */
  const recommended: SortOption = {
    text: 'Recommended',
    onClick: () => setSortBy('Recommended Posts'),
    isSelected: sortBy === 'Recommended Posts',
  };
  const mostLiked: SortOption = {
    text: 'Most Liked',
    onClick: () => setSortBy('Most Liked'),
    isSelected: sortBy === 'Most Liked',
  };
  const recent: SortOption = {
    text: 'Recent',
    onClick: () => setSortBy('Recent Posts'),
    isSelected: sortBy === 'Recent Posts',
  };
  const alphabetical: SortOption = {
    text: 'Alphabetical',
    onClick: () => setSortBy('Alphabetical'),
    isSelected: sortBy === 'Alphabetical',
  };
  const sortOptions = [recommended, recent, mostLiked, alphabetical];

  return (
    <div className=" flex items-center justify-between min-w-full max-w-full h-12">
      {/* Sort by Button */}
      <div className="">
        <div className="flex flex-row items-center z-10 rounded-lg">
          <span className="pr-2 font-bold">Sort by: </span>
          {sortOptions.map((item) => (
            <div
              key={item.text}
              role="button"
              tabIndex={0}
              onClick={item.onClick}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && item.onClick) {
                  item.onClick();
                }
              }}
              className={`btn btn-sm btn-outline btn-neutral justify-start px-2 mr-2 ${item.isSelected ? 'btn-active' : ''}`}
            >
              <h3 className="">{item.text}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
