import React from "react";
import { useState } from "react";

const AddExpenseForm = ({ OnAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    OnAddExpense(expense);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="category">Expense Category</label>
      <input
        id="category"
        type="text"
        aria-label="Expense Category"
        placeholder="Rent, Grocery etc."
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
      />
      <label htmlFor="amount">Amount</label>
      <input
        id="amount"
        type="number"
        aria-label="Amount"
        placeholder="Enter Expense Amount"
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
      />
      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="date"
        aria-label="Expense Date"
        placeholder="Select Expense Date"
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
      />
      <div className="flex justify-end mt-6">
        <button 
          type="button"
          className="add-btn add-btn-fill" 
          onClick={() => OnAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;
