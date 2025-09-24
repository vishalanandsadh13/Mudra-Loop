import React from "react";
import { LuTrendingDown, LuTrendingUp, LuUtensils, LuTrash2} from "react-icons/lu";

const TransactionsInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
    const getAmountStyle = () => {
        if(type === 'income'){
            return 'bg-green-50 text-green-500'
        }
        return 'bg-red-50 text-red-500'
    }
  return (
    <div className="group relative flex items-center gap-4 mt-1 p-2 rounded-lg hover:bg-gray-100/60">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-300 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-4 h-4" />
        ) : (
          <div className="">
            <LuUtensils />
          </div>
        )}
      </div>
      <div className="flex-1 flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-700 font-semibold">{title}</span> <br/>
          <span  className="text-xs text-gray-400 mt-1">{date}</span>
        </div>
        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}
          <div className={`flex items-center gap-2 px-3 py1.5 rounded-md ${getAmountStyle()}`}>
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} ${amount}
            </h6>
            {type === 'income' ? <LuTrendingUp/> : <LuTrendingDown/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsInfoCard;
