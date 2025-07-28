import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionsInfoCard from '../Cards/TransactionsInfoCard'


const RecentIncome = ({transactions, onSeeMore}) => {


  return (
    <div className='card'>
        <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>Recent Income</h2>
            <button onClick={onSeeMore} className='card-btn'>
                See All <LuArrowRight className='text-base'/>
            </button>
        </div>
        <div className='mt-4'>
            {transactions.map((transaction) => (
                <TransactionsInfoCard
                    key={transaction._id}
                    title={transaction.source}
                    amount={transaction.amount}
                    icon={transaction.icon}
                    date={transaction.date}
                    type='income'
                    hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default RecentIncome