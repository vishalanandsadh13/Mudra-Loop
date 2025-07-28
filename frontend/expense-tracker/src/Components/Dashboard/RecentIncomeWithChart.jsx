import React, { useState, useEffect } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const RecentIncomeWithChart = ({dashboardData, totalIncome}) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

    const [chartData, setChartData] = useState([])

    const prepareIncomeChartData = (dashboardData) => {
        // Group income by source and sum amounts
        const groupedData = {};
        dashboardData.forEach((item) => {
            if (groupedData[item.source]) {
                groupedData[item.source] += item.amount;
            } else {
                groupedData[item.source] = item.amount;
            }
        });
        
        const chartData = Object.entries(groupedData).map(([source, amount]) => ({
            name: source,
            value: amount
        }));
        
        setChartData(chartData)
    }

    useEffect(() => {
        prepareIncomeChartData(dashboardData)
    }, [dashboardData])

  return (
    <div className='card'>
        <div className='flex justify-between items-center'>
            <h5 className='text-lg'>Last 60 Days Income</h5>
        </div>
        
        {chartData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No income data available for the last 60 days
          </div>
        ) : (
          <CustomPieChart
            data={chartData}
            colors={COLORS}
            title="Total Income"
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            showTextAnhcor
          />
        )}
    </div>
  )
}

export default RecentIncomeWithChart