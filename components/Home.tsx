import React, { useEffect, useState } from 'react';
import useFetchPosts from 'hooks/fetchPosts';
import { PostData } from 'hooks/PostData';
import CreatePostModal from './CreatePostModal';
import PostCard from './PostCard';
import Header from './Header';
import SortButtons from './SortButtons';

export default function Home() {
  const { recentPostsList } = useFetchPosts();
  const [sortedBy, setSortedBy] = useState('Recent Posts');
  const [sortedPosts, setSortedPosts] = useState(recentPostsList);
  const handleSortBy = (value: string) => {
    setSortedBy(value);
  };

  useEffect(() => {
    if (sortedBy === 'Recent Posts') {
      setSortedPosts(recentPostsList);
    } else if (sortedBy === 'Most Liked') {
      setSortedPosts([...recentPostsList].sort((a, b) => b.likedBy.length - a.likedBy.length));
    } else if (sortedBy === 'Alphabetical') {
      setSortedPosts([...recentPostsList].sort((a, b) => a.title.localeCompare(b.title)));
    } else if (sortedBy === 'Recommended') {
      /* Placeholder for recommended */
      const recommendedPostsList: React.SetStateAction<PostData[]> = [];
      setSortedPosts(recommendedPostsList);
    } else if (sortedBy === 'Reported') {
      /* Placeholder for reported */
      const reportedPosts = [...recentPostsList].filter((post) => post.reports.length > 0);
      reportedPosts.sort((postA, postB) => postB.reports.length - postA.reports.length);
      setSortedPosts(reportedPosts);
    }
  }, [sortedBy, recentPostsList]);

  return (
    <main className="flex flex-col ">
      <Header />
      <div className="flex flex-row justify-center">
        <CreatePostModal />
        {/* Main screen in the middle */}
        <div className="flex flex-col w-full min-w-[70%] sm:w-3/5 place-items-center p-2 gap-2">
          <div className="w-full main-box flex justify-between items-center">
            <div className="flex main-box w-full">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                htmlFor="create-modal"
                className="btn btn-outline bg-neutral
              rounded-full w-full"
              >
                Create new post
              </label>
            </div>
          </div>
          <SortButtons onSortBy={handleSortBy} />
          {sortedPosts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
