import React, { useContext } from "react";
import DashboardLayouts from "../../Components/Layouts/DashboardLayouts";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/apiPath";
import { useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import InfoCard from "../../Components/Cards/InfoCard";
import { addThousandsSeparator } from "../../Utils/Helper";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import RecentTransactions from "../../Components/Dashboard/RecentTransactions";
import FinanceOverview from "../../Components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../Components/Dashboard/ExpenseTransactions";
import Last30DaysTransactions from "../../Components/Dashboard/last30DaysTransactions";

const Home = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { user } = useContext(UserContext);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate("/login");
      }
    } finally {
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
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard
          icon={<IoMdCard />}
          label="Total Balance"
          value={addThousandsSeparator(dashboardData?.totalbalance)}
          color="bg-primary"
        />

        <InfoCard
          icon={<LuWalletMinimal />}
          label="Total Income"
          value={addThousandsSeparator(dashboardData?.totalIncome)}
          color="bg-orange-500"
        />

        <InfoCard
          icon={<LuHandCoins />}
          label="TotalExpense"
          value={addThousandsSeparator(dashboardData?.totalExpense)}
          color="bg-red-500"
        />
        </div> */}
        <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-2  gap-6 mt-6">
          {/* <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalbalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          /> */}
          <ExpenseTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />
          <Last30DaysTransactions
            dashboardData={dashboardData?.last30DaysExpense.transactions || [ ]}
          />
        </div>
      </div>
    </DashboardLayouts>
  );
};

export default Home;
