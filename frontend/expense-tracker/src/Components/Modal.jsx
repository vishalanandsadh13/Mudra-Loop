import React from "react";
import { LuX } from "react-icons/lu";

const Modal = ({ isOpen, onClose, title, children }) => {
    if(!isOpen) return null;
  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50">
      <div className="relative w-full max-w-2xl p-4 max-h-auto">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <button onClick={onClose}>
              <LuX className="text-gray-400 bg-transparent hover:text-gray-900 dark:hover:text-white dark:hover:bg-gray-600 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center cursor pointer " />
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
