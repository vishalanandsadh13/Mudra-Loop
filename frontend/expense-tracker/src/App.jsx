import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Dashboard/Home";
import Expense from "./Pages/Dashboard/Expense";
import Income from "./Pages/Dashboard/Income";
import UserProvider, { UserContext } from "./Context/UserContext";
import './index.css'
import { Toaster } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/Income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
            <Route path="/Expense" element={<ProtectedRoute><Expense /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </div>
      <Toaster 
      position="top-right"
      toastOptions={{
        duration: 2000,
        style: {
          fontSize: "13px",
        },
        className: "",
      }}
      />
    </UserProvider>
  );
};

export default App;
