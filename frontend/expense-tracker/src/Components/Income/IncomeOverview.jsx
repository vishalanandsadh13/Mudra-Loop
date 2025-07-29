import React, { useState, useEffect }  from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeChartData } from '../../Utils/Helper'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const IncomeOverview = ({transactions, onAddIncome}) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareIncomeChartData(transactions)
        setChartData(result)
    }, [transactions])

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg'>Income Overview</h5>
                <span className='text-xs'> Track your earnings over time and analyze your income source.</span>
            </div>
            <button className='add-btn' onClick={onAddIncome}>
                <LuPlus className='text-lg'/>
                Add Income
            </button>
        </div>
        <div className='mt-10'>
            <CustomBarChart
            data={chartData}
            colors={COLORS}
            title="Income Overview"
            label="Income Overview"
            />
        </div>
    </div>
  )
}

export default IncomeOverview