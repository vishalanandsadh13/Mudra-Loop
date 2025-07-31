import React, { useState, useEffect } from 'react'
import DashboardLayouts from '../../Components/Layouts/DashboardLayouts'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/apiPath'
import IncomeOverview from '../../Components/Income/IncomeOverview'
import Modal from '../../Components/Modal'
import AddIncomeForm from '../../Components/Income/AddIncomeForm'
import toast from 'react-hot-toast'

const Income = () => {
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)
  const [IncomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)


  const fetchIncomeData = async () => {
    if(loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME)
      if(response.data.incomes) {
        setIncomeData(response.data.incomes)
      }
    } catch {
      toast.error("Failed to fetch income data")
    } finally {
      setLoading(false)
    }
  }

  const handleAddIncome = async (income) => {
    const { source, amount, date } = income;

    //validation check
    if(!source.trim()){
      toast.error("Income source is required")
      return;
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be a valid number and greater than 0")
      return;
    }
    if(!date){
      toast.error("Income date is required")
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
        source,
        amount,
        date,
      })
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully")
      fetchIncomeData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  useEffect(() => {
    fetchIncomeData()
  }, [])

  return (
    <DashboardLayouts activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
           <div className=''>
              <IncomeOverview
              transactions={IncomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
              />
           </div>
           <IncomeList
           transactions={IncomeData}
           />
        </div>
        <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income"
        >
          <AddIncomeForm
             onAddIncome={handleAddIncome}
          />
        </Modal>
      </div>
    </DashboardLayouts> 
  )
}

export default Income