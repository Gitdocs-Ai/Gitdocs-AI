import React from "react";
import {
    BarChart,
    Bar,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { LuSettings } from "react-icons/lu";
interface DataDashboardProps {
    stats: {
        tokens: number;
        totalTokens: number;
        repositories: number;
        maxRepositories: number;
    };
    monthlyStats: {
        january: number;
        february: number;
        march: number;
        april: number;
        may: number;
        june: number;
        july: number;
        august: number;
        september: number;
        october: number;
        november: number;
        december: number;
    };
}

const DataDashboard: React.FC<DataDashboardProps> = ({
    stats,
    monthlyStats,
}) => {
    // Monthly token usage data
    const monthlyUsageData = [
        { name: "Jan", tokens: monthlyStats.january },
        { name: "Feb", tokens: monthlyStats.february },
        { name: "Mar", tokens: monthlyStats.march },
        { name: "Apr", tokens: monthlyStats.april },
        { name: "May", tokens: monthlyStats.may },
        { name: "Jun", tokens: monthlyStats.june },
        { name: "Jul", tokens: monthlyStats.july },
        { name: "Aug", tokens: monthlyStats.august },
        { name: "Sep", tokens: monthlyStats.september },
        { name: "Oct", tokens: monthlyStats.october },
        { name: "Nov", tokens: monthlyStats.november },
        { name: "Dec", tokens: monthlyStats.december },
    ];

    // AI features usage data
    const aiUsageData = [
        { name: "Documentation", docs: 65, insights: 40 },
        { name: "Code Review", docs: 45, insights: 60 },
        { name: "Refactoring", docs: 30, insights: 50 },
        { name: "Testing", docs: 20, insights: 35 },
        { name: "Debugging", docs: 35, insights: 45 },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8 mt-5">
            {/* Monthly Token Consumption */}
            <div className="bg-[#1A1A1A] p-6 rounded-xl">
                <h3 className="text-lg font-medium mb-4">
                    Monthly Token Consumption
                </h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyUsageData}>
                            <defs>
                                <linearGradient
                                    id="tokenGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#8B5CF6"
                                        stopOpacity={0.4}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#8B5CF6"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(255,255,255,0.1)"
                            />
                            <XAxis
                                dataKey="name"
                                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                                tickLine={false}
                                tick={{ fill: "#8E9196", fontSize: 12 }}
                            />
                            <YAxis
                                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                                tickLine={false}
                                tick={{ fill: "#8E9196", fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1A1F2C",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "8px",
                                }}
                                itemStyle={{ color: "white" }}
                                labelStyle={{ color: "#8E9196" }}
                            />
                            <Area
                                type="monotone"
                                dataKey="tokens"
                                stroke="#8B5CF6"
                                fillOpacity={1}
                                fill="url(#tokenGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* AI Features Usage */}
            {/* <div 
        className="bg-[#1A1A1A] p-6 rounded-xl"
      >
        <h3 className="text-lg font-medium mb-4">AI Features Usage</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={aiUsageData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} 
                tickLine={false}
                tick={{ fill: '#8E9196', fontSize: 12 }}
              />
              <YAxis 
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} 
                tickLine={false}
                tick={{ fill: '#8E9196', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1F2C', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
                itemStyle={{ color: 'white' }}
                labelStyle={{ color: '#8E9196' }}
              />
              <Legend 
                wrapperStyle={{ color: '#8E9196', fontSize: 12 }}
              />
              <Bar dataKey="docs" name="Documentation Generated" stackId="a" fill="#0EA5E9" />
              <Bar dataKey="insights" name="Insights Provided" stackId="a" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div> */}
        </div>
    );
};

export default DataDashboard;
