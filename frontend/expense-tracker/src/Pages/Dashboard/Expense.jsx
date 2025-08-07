import React, { useState, useEffect } from "react";
import DashboardLayouts from "../../Components/Layouts/DashboardLayouts";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/apiPath";
import toast from "react-hot-toast";
import ExpenseOverview from "../../Components/Expense/ExpenseOverview";
import Modal from "../../Components/Modal";
import AddExpenseForm from "../../Components/Expense/AddExpenseForm";
import ExpenseList from "../../Components/Expense/ExpenseList";
import DeleteAlert from "../../Components/DeleteAlert";

const Expense = () => {
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE
      );
      console.log("API response:", response.data);
      if (response.data.expenses) {
        console.log("Setting expense data:", response.data.expenses);
        setExpenseData(response.data.expenses);
      }
    } catch {
      toast.error("Failed to fetch income data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpennse = async (income) => {
    const { category, amount, date } = income;

    //validation check
    if (!category.trim()) {
      toast.error("Income source is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number and greater than 0");
      return;
    }
    if (!date) {
      toast.error("Expense date is required");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting expense");
    }
  };

  const handleDownloadExpenseDetails = async () => {};

  useEffect(() => {
    fetchExpenseData();
  }, []);

  return (
    <DashboardLayouts activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ExpenseOverview
              transactions={expenseData}
              OnAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expenses"
        >
          <AddExpenseForm OnAddExpense={handleAddExpennse} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayouts>
  );
};

export default Expense;
