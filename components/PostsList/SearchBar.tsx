import React from 'react';

type SearchBarProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>
  handleSearch: () => void
};
export default function SearchBar({ setSearch, handleSearch }: SearchBarProps) {
  return (
    <div>
      <div className="hidden md:flex mt-1">
        <form onSubmit={(e) => {
          e.preventDefault();
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          handleSearch();
        }}
        >
          <input
            type="text"
            placeholder="Search"
            className="input input-sm border border-solid border-secondary"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-sm ml-3 btn-primary text-neutral"
          >
            {' '}
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
