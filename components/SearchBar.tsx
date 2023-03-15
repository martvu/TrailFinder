import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch('YourApplicationID', 'YourSearchOnlyAPIKey');

function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="instant_search">
      {/* Widgets */}
    </InstantSearch>
  );
}


type SortButtonsProps = {
  onSortBy: (value: string) => void;
};

export default function SortButtons({ onSortBy }: SortButtonsProps) {
  /* Sorting options */


  return (
    <div className=" flex items-center justify-between min-w-full max-w-full h-12">
      
    </div>
  );
}