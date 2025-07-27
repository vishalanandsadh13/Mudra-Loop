import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { prepareExpenseChartData } from '../../Utils/Helper'
import CustomBarChart from '../Charts/CustomBarChart'

const Last30DaysTransactions = ({data}) => {

    const [chartData, setChartData] = useState([])
    console.log("chartData data", data)
    useEffect(() => {
      const result = prepareExpenseChartData(data);
      setChartData(result);
    
      return () => {}
    }, [data])
    
  return (
    <div className='card col-span-1'>
        <div className='flex justify-between items-center'>
        <h5 className='text-lg'>
           Last 30 days transactions
        </h5>
        </div>
        <CustomBarChart
            data={chartData}
        />
    </div>
  )
}

export default Last30DaysTransactions