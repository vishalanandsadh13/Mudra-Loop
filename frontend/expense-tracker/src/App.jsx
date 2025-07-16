import React from "react";
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
import UserProvider from "./Context/userContext";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/dashboard" element={<Home />}></Route>
            <Route path="/Income" element={<Income />}></Route>
            <Route path="/Expense" element={<Expense />}></Route>
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;

const Root = () => {
  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirect to dashboard if authenticated, otherwise redirect to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
