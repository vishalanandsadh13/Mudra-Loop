import React from 'react'
import DashboardLayouts from '../../Components/Layouts/DashboardLayouts'
import './Dashboard.css'
import { useUserAuth } from '../../Hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/apiPath';
import { useEffect } from 'react'

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`)
      if (response.data) {
        setDashboardData(response.data);
      } 
    }
    catch (error) {
      console.error("Failed to fetch dashboard data", error);
      navigate("/login");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {}
  },[])
  console.log("dashboardData", dashboardData);
  
  return (
    <DashboardLayouts activeMenu="Dashboard">
      <div className="my-5 mx-auto">
           <h2>{Home}</h2>
      </div>
    </DashboardLayouts>
  )
}

export default Home