import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';
import { PostData } from 'hooks/PostData';
import PostCard from './PostCard';

const searchClient = algoliasearch('UZZTXU7KCG', 'e27a723c64a44fa7673477f22a00675c');

function Hit({ hit }: Props) {
  return (
    <article>
      <PostCard post={hit} />
    </article>
  );
}

function Search() {
  return (
    <div className="relative">
      <InstantSearch searchClient={searchClient} indexName="posts">
        <SearchBox
          classNames={
            {
              root: 'w-full',
              input: 'w-full border border-gray-300 rounded-md shadow-md',
            }
          }
        />
        <Hits
          hitComponent={Hit}
          // puts the hits in a list beneath the search box
          classNames={
            {
              list: 'absolute w-full bg-neutral z-10 border border-gray-300 rounded-md shadow-md',
              item: 'p-2',
            }
        }
        />
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
