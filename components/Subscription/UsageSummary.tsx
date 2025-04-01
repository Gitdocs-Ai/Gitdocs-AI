import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface UsageSummaryProps {
  stats: {
    tokens: number;
    totalTokens: number;
    repositories: number;
    maxRepositories: number;
  };
  weeklyStats: {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
  };
}

const UsageSummary: React.FC<UsageSummaryProps> = ({ stats, weeklyStats }) => {
  // Sample usage data for chart
  const usageData = [
    { day: "Mon", usage: weeklyStats.monday },
    { day: "Tue", usage: weeklyStats.tuesday },
    { day: "Wed", usage: weeklyStats.wednesday },
    { day: "Thu", usage: weeklyStats.thursday },
    { day: "Fri", usage: weeklyStats.friday },
    { day: "Sat", usage: weeklyStats.saturday },
    { day: "Sun", usage: weeklyStats.sunday },
  ];

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-xl mt-8">
      <h3 className="text-lg font-medium mb-7">Usage Summary</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-grayText">Tokens Used</span>
              <span className="text-sm">
                {stats.tokens}/{stats.totalTokens}
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#885EF6] to-[#0FA5E9]"
                initial={{ width: 0 }}
                animate={{
                  width: `${(stats.tokens / stats.totalTokens) * 100}%`,
                }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-grayText">Repositories</span>
              <span className="text-sm">
                {stats.repositories}/{stats.maxRepositories}
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0FA5E9] to-[#885EF6]"
                initial={{ width: 0 }}
                animate={{
                  width: `${(stats.repositories / stats.maxRepositories) * 100}%`,
                }}
                transition={{ duration: 1, delay: 1 }}
              />
            </div>
          </div>
        </div>

        <div className="h-[160px] -mt-14">
          <h2 className="text-grayText text-lg font-medium mb-2">
            Weekly Token Usage
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usageData}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8E9196", fontSize: 12 }}
              />
              <YAxis hide={true} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1F2C",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "white" }}
                labelStyle={{ color: "#8E9196" }}
              />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="url(#colorGradient)"
                strokeWidth={2}
                dot={{ fill: "#8B5CF6", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#0EA5E9" }}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#0EA5E9" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UsageSummary;
