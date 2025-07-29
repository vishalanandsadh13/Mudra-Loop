import React, { useState, useEffect } from 'react'
import DashboardLayouts from '../../Components/Layouts/DashboardLayouts'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/apiPath'
import IncomeOverview from '../../Components/Income/IncomeOverview'
import Modal from '../../Components/Modal'

const Income = () => {
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)
  const [IncomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })

  const fetchIncomeData = async () => {
    if(loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME)
      console.log(response)
      if(response.data.incomes) {
        setIncomeData(response.data.incomes)
      }
    } catch (error) {
      console.error("Failed to fetch income data", error)
    } finally {
      setLoading(false)
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
        </div>
        <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income"
        >
          {/* <AddIncomeForm
          onClose={() => setOpenAddIncomeModal(false)}
          /> */}
          <div>
              Add Income Form
          </div>
        </Modal>
      </div>
    </DashboardLayouts> 
  )
}

export default Income