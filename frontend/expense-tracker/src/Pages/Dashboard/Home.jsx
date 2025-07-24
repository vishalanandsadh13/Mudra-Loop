import React, { useContext } from 'react'
import DashboardLayouts from '../../Components/Layouts/DashboardLayouts'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/apiPath';
import { useEffect } from 'react'
import { UserContext } from '../../Context/UserContext';

const Home = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { user } = useContext(UserContext);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA)
      if (response.data) {
        setDashboardData(response.data);
      } 
    }
    catch (error) {
      console.error("Failed to fetch dashboard data", error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        navigate("/login");
      }
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <DashboardLayouts activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <h2>Home</h2>
        {dashboardData && (
          <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
        )}
      </div>
    </DashboardLayouts>
  )
}

export default Home