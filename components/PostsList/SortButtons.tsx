import { useFetchUser } from 'context/AuthContext';
import React from 'react';
import {
  alphabetical,
  mostLiked,
  recent,
  recommended,
  reported,
  SortOption,
} from './SortOption';

type SortButtonsProps = {
  selectedSortOption: SortOption;
  setSelectedSortOption: React.Dispatch<React.SetStateAction<SortOption>>;
};

export default function SortButtons({
  selectedSortOption,
  setSelectedSortOption,
}: SortButtonsProps) {
  const { userData } = useFetchUser();
  const adminState = userData?.isAdmin ?? false;

  const sortOptions = [recommended, recent, mostLiked, alphabetical];
  if (adminState) sortOptions.push(reported);

  return (
    <div>
      {/* Sort by Button */ }
      <div className="flex flex-row items-center justify-center">
        <span className="pr-2 text-xs lg:text-base font-bold">Sort by: </span>
        <div className="flex flex-wrap sm:flex-row items-center z-10 rounded-lg">

          {sortOptions.map((option) => (
            <div
              key={option.text}
              role="button"
              tabIndex={0}
              onClick={() => { setSelectedSortOption(option); }}
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
