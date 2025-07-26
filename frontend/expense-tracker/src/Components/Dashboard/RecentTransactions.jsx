import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionsInfoCard from "../Cards/TransactionsInfoCard";
import moment from "moment";
const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h6 className="text-lg font-bold">Recent Transactions</h6>
        <button className="card-btn" onClick={onSeeMore}>
          See More <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {transactions?.slice(0, 5).map((item) => (
          <TransactionsInfoCard
            key={item._id}
            title={item.type == "expense" ? item.category : item.source}
            icon={item.icon}
            date={moment(item.date).format("DD MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
