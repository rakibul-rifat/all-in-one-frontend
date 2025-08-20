import React, { useState } from "react";

import BottomNav from "./BottomNav";

export default function Calculator() {
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [duration, setDuration] = useState(0); // in months
  const [type, setType] = useState("simple");
  const [compoundFrequency, setCompoundFrequency] = useState("12"); // monthly

  const timeInYears = duration / 12;
  const n = parseInt(compoundFrequency); // times compounded per year

  const simpleInterest = (amount * rate * timeInYears) / 100;

  const compoundTotal =
    amount * Math.pow(1 + rate / (100 * n), n * timeInYears);
  const compoundInterest = compoundTotal - amount;

  const profit = type === "simple" ? simpleInterest : compoundInterest;
  const total = type === "simple" ? amount + simpleInterest : compoundTotal;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center ">
      <div className="w-full max-w-md p-2 bg-gray-900 shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-300">
          Bank Deposit Profit Calculator
        </h2>

        <div className="mt-6 p-4 bg-gray-700 rounded text-center">
          <p className="text-lg font-semibold text-yellow-400">
            📈 Total Profit: ৳{profit.toFixed(2)}
          </p>
          <p className="text-lg font-semibold text-green-400">
            💰 Final Amount: ৳{total.toFixed(2)}
          </p>
        </div>

        <label className="block text-gray-400 mb-2 mt-5">
          Deposit Amount (৳)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-800 text-gray-200"
        />

        <label className="block text-gray-400 mb-2">Interest Rate (%)</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(+e.target.value)}
          className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-800 text-gray-200"
        />

        <label className="block text-gray-400 mb-2">Duration (Months)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(+e.target.value)}
          className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-800 text-gray-200"
        />

        <div className="flex items-center gap-4 mb-4 text-gray-400">
          <label>
            <input
              type="radio"
              value="simple"
              checked={type === "simple"}
              onChange={() => setType("simple")}
              className="mr-1"
            />
            Simple Interest
          </label>
          <label>
            <input
              type="radio"
              value="compound"
              checked={type === "compound"}
              onChange={() => setType("compound")}
              className="mr-1"
            />
            Compound Interest
          </label>
        </div>

        {type === "compound" && (
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">
              Compound Frequency
            </label>
            <select
              value={compoundFrequency}
              onChange={(e) => setCompoundFrequency(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-gray-200"
            >
              <option value="1">Yearly</option>
              <option value="2">Half-Yearly</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
              <option value="365">Daily</option>
            </select>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
