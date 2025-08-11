import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
        <div className='w-full min-h-screen md:w-[60vw] px-12 pt-8 pb-12 flex flex-col'>
            <h2 className='text-lg font-medium text-slate-800 mb-4'>
                Expense Tracker
            </h2>
            <div className='w-full flex-1 flex items-center justify-center'>
                 {children}
            </div>
        </div>
    </div>
  )
}

export default AuthLayout