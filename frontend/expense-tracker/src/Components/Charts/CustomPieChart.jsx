import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import CustomTooltip from "./CustomToolTip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({
  data,
  colors,
  label,
  totalAmount,
  showTextAnhcor,
}) => {
    console.log("data",data)
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={CustomTooltip}/>
        <Legend content={CustomLegend}/>
        {showTextAnhcor && (
          <>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy={-25}
              fill="#666"
              fontSize="14px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy={8}
              fill="#333"
              fontSize="24px"
              fontWeight="semi-bold"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
