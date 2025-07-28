import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionsInfoCard from '../Cards/TransactionsInfoCard'

const ExpenseTransactions = ({transactions, onSeeMore}) => {
    console.log("transactions", transactions)
  return (
    <div className='card'>
        <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>Expenses</h2>
            <button onClick={onSeeMore} className='card-btn'>
                See All <LuArrowRight className='text-base'/>
            </button>
        </div>
        <div className='mt-4'>
            {transactions?.map((expense) => (
            <TransactionsInfoCard
                title={expense.category}
                amount={expense.amount}
                icon={expense.icon}
                key={expense._id}
                type='expense'
                date={moment(expense.createdAt).format('DD MMM YYYY')}
                hideDeleteBtn
            />
            ))}
        </div>
    </div>
  )
}

export default ExpenseTransactions