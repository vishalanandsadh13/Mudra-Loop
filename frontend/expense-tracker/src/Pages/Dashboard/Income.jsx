import React, { useState, useEffect } from 'react'
import DashboardLayouts from '../../Components/Layouts/DashboardLayouts'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/apiPath'
import IncomeOverview from '../../Components/Income/IncomeOverview'
import Modal from '../../Components/Modal'
import AddIncomeForm from '../../Components/Income/AddIncomeForm'
import toast from 'react-hot-toast'
import IncomeList from '../../Components/Income/IncomeList'
import DeleteAlert from '../../Components/DeleteAlert'

const Income = () => {
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)
  const [IncomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({show: false, data: null})
  const [downloading, setDownloading] = useState(false)


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

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      setOpenDeleteAlert({show: false, data: null})
      toast.success("Income deleted successfully")
      fetchIncomeData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting income")
    }
  };

  const handleDownloadIncomeDetails = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: 'blob',
      });

      // Create blob with proper MIME type for Excel
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'income_details.xlsx');
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Income details downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      toast.error(error.response?.data?.message || "Error downloading file");
    } finally {
      setDownloading(false);
    }
  };

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
           onDelete={(id) => {
            setOpenDeleteAlert({show: true, data: id})
           }}
           onDownload={handleDownloadIncomeDetails}
           downloading={downloading}
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
        <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({show: false, data: null})}
        title="Delete Income"
        >
          <DeleteAlert
          content="Are you sure you want to delete this income?"
          onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayouts> 
  )
}

export default Income