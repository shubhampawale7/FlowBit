// client/src/components/dashboard/SpendingChart.jsx

import React, { useState, useCallback } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

// New "Ink & Gold" color palette for the chart
const COLORS = ["#B08968", "#9C6644", "#7F5539", "#DDB892", "#E5E1DA"];

// Custom Tooltip with the new theme
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-paper dark:bg-ink border border-gold/30 rounded-lg shadow-xl font-sans">
        <p className="font-bold text-ink dark:text-paper">{`${payload[0].name}`}</p>
        <p className="text-sm text-ink/70 dark:text-paper/70">{`Total Spent: ₹${payload[0].value.toLocaleString(
          "en-IN"
        )}`}</p>
      </div>
    );
  }
  return null;
};

// Custom shape for the active (hovered) pie sector
const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy - 10}
        dy={8}
        textAnchor="middle"
        className="font-sans text-xs fill-current text-ink/60 dark:text-paper/60"
      >
        {payload._id}
      </text>
      <text
        x={cx}
        y={cy + 10}
        dy={8}
        textAnchor="middle"
        className="font-serif text-2xl font-bold fill-current text-gold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

const SpendingChart = ({ data }) => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div className="w-full h-96 bg-paper-secondary dark:bg-ink-secondary p-6 rounded-xl border border-gold/10">
      <h3 className="font-serif text-2xl font-bold mb-4 text-ink dark:text-paper">
        Category Breakdown
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<CustomTooltip />} />
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill={theme === "dark" ? "#E5E1DA" : "#7F5539"}
            dataKey="totalAmount"
            nameKey="_id"
            onMouseEnter={onPieEnter}
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="focus:outline-none outline-none"
                style={{ outline: "none" }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
