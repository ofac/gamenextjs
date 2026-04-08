"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";


export default function Chart({ pieData, yearData }: any) {
  const colors = ["#99c5eb", "#9fcb9f", "#f599a0", "#cd9ca0", "#a6a6a6"];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="bg-base-100 p-4 rounded-box shadow">
        <h2 className="text-xl font-semibold mb-4">
          Games per Console
        </h2>
        <div className="w-full h-80">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="gamesCount"
                nameKey="name"
                outerRadius={120}
                label
              >
                {pieData.map((_: any, index: number) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-base-100 p-4 rounded-box shadow">
        <h2 className="text-xl font-semibold mb-4">
          Games per Year
        </h2>
        <div className="w-full h-80">
          <ResponsiveContainer>
            <BarChart data={yearData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="count">
                {yearData.map((entry:any, index:any) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={'#c084fc'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}