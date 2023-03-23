import { useState, useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { useAuth, useFetchUser } from 'context/AuthContext';
import { firestore, storage } from '../firebase/firebase';
import { PostData } from './PostData';

export default function useFetchPicture() {
  const [loading, setLoading] = useState(true);
  const { userData } = useFetchUser();
  const [profilePicture, setProfilePictureUrl] = useState<string>('');

  useEffect(() => {
    async function fetchProfilePicture() {
      if (userData.profilePicture) {
        const profilePictureRef = ref(storage, userData.profilePicture);
        const downloadUrl = await getDownloadURL(profilePictureRef);
        setProfilePictureUrl(downloadUrl);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchProfilePicture();
  }, [userData]);

  return { profilePicture, setProfilePictureUrl };
}
