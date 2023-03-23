import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';
import { PostData } from '../hooks/PostData';

const searchClient = algoliasearch('UZZTXU7KCG', 'e27a723c64a44fa7673477f22a00675c');
function SearchResult({ post }: { post: PostData }) {
  return (
    <div className="card w-full">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p className="card-subtitle">{post.username}</p>
        <p className="card-subtitle">{post.price}</p>
        <p className="card-subtitle">{post.length}</p>
        <p className="card-subtitle">{post.stops}</p>
        <p className="card-subtitle">{post.rating}</p>
        <p className="card-subtitle">{post.description}</p>
      </div>
    </div>
  );
}

function Hit({ hit }: Props) {
  return (
    <article>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <SearchResult post={hit} />
    </article>
  );
}

function Search() {
  const [showHits, setShowHits] = useState(false);
  return (
    <div className="relative">
      <InstantSearch searchClient={searchClient} indexName="posts">
        <SearchBox
          onFocus={() => setShowHits(true)}
          onBlur={() => setShowHits(false)}
          classNames={
            {
              input: 'bg-neutral border border-gray-400 rounded-full py-2 px-32 mr-4 pl-12 focus:border-green-500',
            }
          }
        />
        {showHits ? (
          <Hits
            hitComponent={Hit}
            classNames={
              {
                list: 'absolute w-full bg-neutral z-20 border border-gray-300 rounded-md shadow-md',
                item: 'p-2 hover:bg-gray-100',
              }
          }
          />
        ) : null }
      </InstantSearch>
    </div>
  );
}

export default function SearchBar() {
  return (
    <form className="flex items-center mx-auto ml-32 mr-32">
      <Search />
    </form>
  );
}
