// src/App.jsx
import { useState } from 'react';

const explanations = {
  totalSupply: "The maximum number of tokens that will ever exist.",
  circulatingSupply: "Tokens currently available and circulating in the market.",
  emissionsRate: "New tokens generated per year.",
  inflationRate: "Percentage increase in supply per year.",
  rewardPool: "Tokens reserved for rewards to users or stakers."
};

function App() {
  const [tokenomics, setTokenomics] = useState({
    totalSupply: 1000000,
    circulatingSupply: 500000,
    emissionsRate: 50000,
    inflationRate: 5,
    rewardPool: 200000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTokenomics((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const projectedCirculation = tokenomics.circulatingSupply + tokenomics.emissionsRate;
  const actualInflation = (tokenomics.emissionsRate / tokenomics.circulatingSupply) * 100;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">📊 Tokenomics Simulator</h1>

      <div className="space-y-6">
        {Object.keys(tokenomics).map((key) => (
          <div key={key}>
            <label className="block text-sm font-semibold capitalize">
              {key.replace(/([A-Z])/g, ' $1')}: 
              <span className="text-gray-500 text-xs block">{explanations[key]}</span>
            </label>
            <input
              type="number"
              name={key}
              value={tokenomics[key]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
            />
          </div>
        ))}
      </div>

      <div className="mt-10 bg-gray-50 p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">📈 Simulation Output</h2>
        <p>Projected Circulating Supply (Next Year): <strong>{projectedCirculation.toLocaleString()}</strong></p>
        <p>Inflation from Emissions: <strong>{actualInflation.toFixed(2)}%</strong></p>
        <p>Reward Pool Remaining After 1 Year: <strong>{(tokenomics.rewardPool - tokenomics.emissionsRate).toLocaleString()}</strong></p>
      </div>
    </div>
  );
}

export default App;

