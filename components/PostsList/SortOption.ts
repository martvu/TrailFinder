import { useFetchUser } from 'context/AuthContext';
import { usePosts } from 'hooks/fetchPosts';
import { PostData } from '../../hooks/PostData';

export interface SortOption {
  text: string;
  icon: string;
  sort: (posts: PostData[]) => PostData[];
}

export const recommended: SortOption = {
  text: 'Recommended',
  icon: 'fa-solid fa-fire',
  sort: (posts) => posts,
};

export const mostLiked: SortOption = {
  text: 'Most Liked',
  icon: 'fa-solid fa-heart',
  sort: (posts) => [...posts].sort(
    (a, b) => b.likedBy.length - a.likedBy.length,
  ),
};

export const recent: SortOption = {
  text: 'Recent',
  icon: 'fa-solid fa-clock',
  sort: (posts) => posts,
};

export const alphabetical: SortOption = {
  text: 'A-Z',
  icon: 'fa-solid fa-sort-alpha-down',
  sort: (posts) => [...posts].sort(
    (a, b) => a.title.localeCompare(b.title),
  ),
};

export const reported: SortOption = {
  text: 'Reported',
  icon: 'fa-solid fa-flag text-error',
  sort: (posts) => [...posts].filter((post) => post.reports.length > 0)
    .sort((postA, postB) => postB.reports.length - postA.reports.length),
};

export default function GetRecommended() {
  const { recentPostsList } = usePosts();
  const { userData } = useFetchUser();
  const likedPosts = recentPostsList.filter(
    (post) => post.likedBy.includes(userData?.username) && post.username !== userData?.username,
  );

  function jaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const intersection = new Set([...setA].filter((x) => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return intersection.size / union.size;
  }

  // eslint-disable-next-line max-len
  const unLikedPosts = recentPostsList.filter((post) => !post.likedBy.includes(userData?.username)).filter((post) => post.username !== userData?.username);
  const recommendedPosts = unLikedPosts.map((post) => {
    const postStops = new Set(post.stops);
    const similarity = jaccardSimilarity(
      new Set(likedPosts.flatMap((p) => p.stops)),
      postStops,
    );
    return { ...post, relevanceScore: similarity };
  });
  return recommendedPosts
    // eslint-disable-next-line max-len
    .sort((a: { relevanceScore: number; }, b: { relevanceScore: number; }) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5);
}
