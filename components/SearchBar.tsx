import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';
import { PostData } from 'hooks/PostData';
import { connectStateResults } from 'react-instantsearch-dom';
import PostCard from './PostCard';

// Your component code goes here


const searchClient = algoliasearch('UZZTXU7KCG', 'e27a723c64a44fa7673477f22a00675c');

type Props={
  hit: any;
}

type PostProps = {
  post: PostData,
}


function Hit({ hit }: Props) {
  /*({[hit.title, hit.price, hit.rating, hit.date, hit.username, hit.length, hit.stops, hit.description, hit.likedBy] }: PostProps*/
  return (
    <article>
      <PostCard post={hit}/>
    </article>
  );
}




function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="posts">
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}

export default function SearchBar() {
  /* Sorting options */


  return (
    
    <form className="flex items-center mx-auto ml-32 mr-32">
      <App/>
    </form>
  );
}