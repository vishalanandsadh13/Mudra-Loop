import React, { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../Utils/Helper";
import CustomLineChart from "../Charts/CustomLineChart";
const ExpenseOverview = ({ transactions, OnAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg ">Expense Overview</h5>
          <span className="text-xs text-gray-400 mt-0.4">
            {" "}
            Track your spending Trends and gain insight into where your money
            goes.
          </span>
        </div>
        <button className="add-btn" onClick={OnAddExpense}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>
      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
