import React, {Component, PropsWithChildren} from "react";

interface Props {
  isVisible: boolean;
}

const TrashDiv: React.FC<PropsWithChildren<Props>> = ({ isVisible }) => {
  return (
    <>
      {isVisible && (
        <div>
          <i className="fa-solid fa-trash-can"></i>
        </div>
      )}
    </>
  );
};

export default TrashDiv;