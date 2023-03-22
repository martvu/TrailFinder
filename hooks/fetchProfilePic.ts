import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { firestore, storage } from '../firebase/firebase';

export default async function fetchProfilePic(uid: string) {
  if (!uid || uid === '') return '';
  const docRef = doc(firestore, 'users', uid);
  const docSnap = await getDoc(docRef);
  const profilePicture = docSnap.data()?.profilePicture as string;
  if (!profilePicture || profilePicture === '') return '';
  const profilePictureRef = ref(storage, profilePicture);
  const downloadUrl = await getDownloadURL(profilePictureRef);
  return downloadUrl;
}
