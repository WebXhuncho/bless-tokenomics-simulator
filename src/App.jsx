import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const allocations = [
  { name: 'Community Incentives', value: 35 },
  { name: 'Ecosystem & Foundation', value: 19.5 },
  { name: 'Investors', value: 17.5 },
  { name: 'Team', value: 15 },
  { name: 'Airdrop', value: 10 },
  { name: 'Advisors', value: 3 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#7F00FF', '#FF4560'];

const emissions = Array.from({ length: 12 }, (_, i) => ({
  epoch: i + 1,
  TIME: 100000000,
  cumulative: 100000000 * (i + 1),
}));

export default function App() {
  const totalSupply = 10_000_000_000;
  const stakedPercent = 0.3;
  const stakingRewards = totalSupply * stakedPercent * 0.12;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bless Network Tokenomics Simulator</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Token Allocation</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={allocations} dataKey="value" nameKey="name" outerRadius={100} label>
              {allocations.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">TIME Emission per Epoch</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={emissions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="epoch" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="TIME" stroke="#8884d8" />
            <Line type="monotone" dataKey="cumulative" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Staking Simulation</h2>
        <p>If 30% of total supply is staked, expected annual reward (12% APR):</p>
        <p className="font-bold text-lg">{stakingRewards.toLocaleString()} BLESS</p>
      </div>
    </div>
  );
}
