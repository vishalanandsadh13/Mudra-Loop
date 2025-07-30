import React from "react";
import { useState } from "react";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddIncome(income);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="source">Income Source</label>
      <input
        id="source"
        type="text"
        aria-label="Income Source"
        placeholder="Freelance, salary etc."
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
      />
      <label htmlFor="amount">Amount</label>
      <input
        id="amount"
        type="number"
        aria-label="Amount"
        placeholder="Enter Income Amount"
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
      />
      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="date"
        aria-label="Income Date"
        placeholder="Select Income Date"
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
      />
      <div className="flex justify-end mt-6">
        <button 
          type="button"
          className="add-btn add-btn-fill" 
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </form>
  );
};

export default AddIncomeForm;
