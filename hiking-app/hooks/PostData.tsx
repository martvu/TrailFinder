import { Timestamp } from 'firebase/firestore';

export type PostData = {
  id: string;
  date: Timestamp;
  route: string[];
  price: string;
  rating: number;
  title: string;
  username: string;
};
