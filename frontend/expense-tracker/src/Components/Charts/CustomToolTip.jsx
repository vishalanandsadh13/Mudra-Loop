import React from 'react'

const CustomToolTip = ({active, payload}) => {
  if (active && payload && payload.length){
    return (
       <div className='bg-white shadow-md rounded-lg border border-gray-300 px-4 pt-0 pb-0'>
        <p className='text-xs font-semibold tetx-purple-800 mb-1'>{payload[0].name}</p>
        <p className='text-sm text-gray-600'>
            Amount: <span className='text-sm font-medium text-gray-900'>${payload[0].value}</span>
        </p>
       </div>
    )
  }
  return null;
}

export default CustomToolTip