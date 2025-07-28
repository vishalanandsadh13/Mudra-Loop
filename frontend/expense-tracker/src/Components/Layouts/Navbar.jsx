import React from 'react'
import SideMenu from './SideMenu'
import {HiOutlineMenu, HiOutlineX} from 'react-icons/hi'
import { useState } from 'react'    

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setopenSideMenu] = useState(false)
  return (
    <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-sm py-4 px-7 sticky top-0 z-300'>
         <button
            className='block lg:hidden text-black bg-white border border-gray-200/50 rounded-md p-2'
            onClick={() => setopenSideMenu(!openSideMenu)}
         >
            {openSideMenu ? 
            <HiOutlineX  className='text-2xl'/> : 
            <HiOutlineMenu className='text-2xl'/>}
         </button>
         <h2 className='text-2xl font-medium text-black place-content-center'>MudraLoop</h2>
         {openSideMenu && (
            <div className='fixed top-[68px] -ml-4 bg-white'>
                <SideMenu activeMenu={activeMenu} />
            </div>
        )}
    </div>
  )
}

export default Navbar