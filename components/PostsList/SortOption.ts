import { PostData } from '../../hooks/PostData';

export interface SortOption {
  text: string;
  icon: string;
  sort: (posts: PostData[]) => PostData[];
}

export const recommended: SortOption = {
  text: 'Recommended',
  icon: 'fa-solid fa-fire',
  sort: () => [],
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
