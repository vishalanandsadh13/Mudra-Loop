import React from 'react'
import { getInitial } from '../../Utils/Helper';

const CharAvatar = ({fullName, width, height, style}) => {
    console.log("fullName", fullName);
  return (
    <div className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex pt-[20px] item-center justify-center rounded-full text-gray-900 font-medium bg-gray-100 `}>
        {getInitial(fullName || '')}
        </div>
  )
}

export default CharAvatar