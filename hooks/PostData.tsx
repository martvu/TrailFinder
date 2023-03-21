import { Timestamp } from 'firebase/firestore';

export type PostData = {
  id: string,
  date: Timestamp;
  stops: string[];
  price: string;
  rating: number;
  title: string;
  username: string;
  description: string;
  length: string;
  likedBy: string[];
  reports: string[];
  uid: string;
};
