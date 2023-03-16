import { useFetchUser } from 'context/AuthContext';
import React, { useEffect, useState } from 'react';
import { PostData } from '../hooks/PostData';
import { usePosts } from '../hooks/fetchPosts';

interface SortOption {
  text: string;
  icon: string;
  onClick: () => void;
}

type SortButtonsProps = {
  setSortedPosts: React.Dispatch<React.SetStateAction<PostData[]>>;
};

export default function SortButtons({ setSortedPosts }: SortButtonsProps) {
  const { userData } = useFetchUser();
  const { recentPostsList, loading } = usePosts();
  const adminState = userData?.isAdmin ?? false;

  const recommended: SortOption = {
    text: 'Recommended',
    icon: 'fa-solid fa-fire',
    onClick: () => { setSortedPosts([]); },
  };
  const mostLiked: SortOption = {
    text: 'Most Liked',
    icon: 'fa-solid fa-heart',
    onClick: () => setSortedPosts([...recentPostsList].sort(
      (a, b) => b.likedBy.length - a.likedBy.length,
    )),
  };
  const recent: SortOption = {
    text: 'Recent',
    icon: 'fa-solid fa-clock',
    onClick: () => setSortedPosts(recentPostsList),
  };
  const alphabetical: SortOption = {
    text: 'A-Z',
    icon: 'fa-solid fa-sort-alpha-down',
    onClick: () => setSortedPosts([...recentPostsList].sort(
      (a, b) => a.title.localeCompare(b.title),
    )),
  };
  const reported: SortOption = {
    text: 'Reported',
    icon: 'fa-solid fa-flag text-error',
    onClick: () => setSortedPosts([...recentPostsList].filter((post) => post.reports.length > 0)
      .sort((postA, postB) => postB.reports.length - postA.reports.length)),
  };
  const sortOptions = [recommended, recent, mostLiked, alphabetical];
  if (adminState) sortOptions.push(reported);
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(recent);

  return (
    <div className=" flex items-center justify-between min-w-full max-w-full h-12">
      {/* Sort by Button */}
      <div className="flex flex-row items-center justify-center">
        <span className="pr-2 text-xs lg:text-base font-bold">Sort by: </span>
        <div className="flex flex-wrap sm:flex-row items-center z-10 rounded-lg">

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
              className={`relative btn btn-xs my-1 lg:btn-sm btn-outline btn-neutral justify-start px-2 mr-2 ${option.text === selectedSortOption.text ? 'btn-active' : ''}`}
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
