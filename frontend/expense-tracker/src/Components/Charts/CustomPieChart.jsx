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
    // Validate data
    if (!data || data.length === 0) {
        return <div className="text-center py-8 text-gray-500">No data available</div>;
    }
    
    // Check if all data has required fields
    const validData = data.filter(item => item.name && typeof item.value === 'number' && item.value > 0);
    
    if (validData.length === 0) {
        return <div className="text-center py-8 text-gray-500">No valid data available</div>;
    }
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={validData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {validData.map((entry, index) => (
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
    </div>
  );
};

export default CustomPieChart;
