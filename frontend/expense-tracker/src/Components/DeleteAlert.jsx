import React from "react";

const DeleteAlert = ({ content, onDelete}) => {
  return (
    <div>
        <h4 className="text-sm font-semibold">{content}</h4>
        <div className='flex justify-end gap-4 mt-6'>
            <button className='add-btn add-btn-fill ' onClick={onDelete}>Delete</button>
        </div>
    </div>
  );
};

export default DeleteAlert;