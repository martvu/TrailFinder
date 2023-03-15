import React, { useEffect, useRef, useState } from 'react';
import { useFetchUser } from 'context/AuthContext';
import { PostData } from 'hooks/PostData';
import {
  arrayUnion, deleteDoc, doc, getDoc, updateDoc,
} from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import EditPostModal from './EditPostModal';

interface Props {
  className: string;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostData;
}

interface Option {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  onClick: () => void | Promise<void> | number;
  visible?: boolean;
}

export default function OptionMenu({ className, setIsDeleted, post }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useFetchUser();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isOwner = (post.username === userData.username);
  const [isEdit, setIsEdit] = useState(false);
  const [isReported, setIsReported] = useState(post.reports?.includes(userData.uid));
  const adminState = userData?.isAdmin ?? false;
  const [reportCounter, setReportCounter] = useState([...post.reports]?.length);
  async function deletePost() {
    if (adminState || post.username === userData?.username) {
      // eslint-disable-next-line no-alert
      const confirmDelete = window.confirm('Are you sure you want to delete this post?');
      if (confirmDelete) {
        await deleteDoc(doc(firestore, 'posts', `post: ${post.id}`));
        setIsDeleted(true);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert("You don't have permission to delete that post..");
    }
  }
  async function reportPost() {
    // eslint-disable-next-line no-alert
    const confirmReport = window.confirm('Are you sure you want to report this post?');
    if (confirmReport) {
      const postRef = doc(firestore, 'posts', post.id);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        const reportSnap = postSnap.data().reports as string[] || [];
        reportSnap.push(userData.uid);
        await updateDoc(postRef, { reports: arrayUnion(...reportSnap) });
        setIsOpen(false);
        setIsReported(true);
      }
      setReportCounter(reportCounter + 1);
    }
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event?.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isEdit]);

  const deleteButton: Option = {
    text: 'Delete',
    icon: <i className="fa-solid fa-trash" />,
    onClick: deletePost,
    visible: isOwner || adminState,
  };
  const editButton: Option = {
    text: 'Edit',
    icon: <i className="fa-solid fa-pen-to-square" />,
    onClick: () => { setIsOpen(false); setIsEdit(true); },
    visible: isOwner,
  };
  const reportButton: Option = {
    text: 'Report',
    icon: <i className="fa-solid fa-flag" />,
    onClick: () => {
      setIsEdit(false);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      reportPost();
    },
    visible: !isReported,
  };
  /* const isReportedButton: Option = {
    text: 'unreport',
    icon: <i className="fa-solid fa-flag" />,
    onClick: () => { setIsEdit(false); setIsOpen(false); },
    visible: isReported,
  }; */
  const options = [deleteButton, editButton, reportButton];
  // f (post.username != userData?.username && !adminState) return <></>

  return (
    <>
      {(isReported || adminState) && reportCounter > 0
        && (
          <div className="text-error absolute top-2 right-2">
            {adminState && <span>{reportCounter}</span>}
            <span className="mr-2"> Reported!</span>
            <i className="fa-solid fa-flag " />
          </div>
        )}
      <div className={className} ref={dropdownRef}>
        <label htmlFor={isEdit ? `edit-modal${post.id}` : ''}>
          <button
            className="btn btn-sm btn-circle btn-outline"
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
          >
            <i className={!isOpen ? 'fa-solid fa-ellipsis' : 'fa-solid fa-ellipsis-vertical'} />
          </button>

          {isOpen && options.filter((item) => item.visible).length > 0 && (
            <div className="absolute shadow-md top-0 left-8 z-10 bg-neutral px-2 py-1 rounded-md w-28">
              {options
                .filter((item) => item.visible)
                .map((item) => (
                  // eslint-disable-next-line max-len
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div
                    key={item.text}
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-floating-promises
                      item.onClick();
                    }}
                    className="flex w-full flex-row text-left btn btn-xs btn-outline"
                  >
                    <h3>{item.icon}</h3>
                    <h3 className="px-2">{item.text}</h3>
                  </div>
                ))}
            </div>
          )}

        </label>
        <EditPostModal
          postData={post}
        />
      </div>
    </>
  );
}
