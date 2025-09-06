import React, { useState } from "react";
import BottomNav from "./BottomNav";
import { useTheme } from "../context/ThemeProvider"; // Import the theme context

export default function Calculator() {
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [duration, setDuration] = useState(0); // in months
  const [type, setType] = useState("simple");
  const [compoundFrequency, setCompoundFrequency] = useState("12"); // monthly
  const { theme } = useTheme(); // Get current theme

  // Theme-based styles
  const containerBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const calculatorBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const cardBg = theme === "dark" ? "bg-gray-700" : "bg-gray-200";
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-800";
  const labelColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const inputBg = theme === "dark" ? "bg-gray-800" : "bg-gray-50";
  const inputBorder = theme === "dark" ? "border-gray-600" : "border-gray-300";
  const inputText = theme === "dark" ? "text-gray-200" : "text-gray-900";
  const profitColor = theme === "dark" ? "text-yellow-400" : "text-yellow-600";
  const totalColor = theme === "dark" ? "text-green-400" : "text-green-600";
  const radioColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const shadow = theme === "dark" ? "shadow-md" : "shadow-lg";

  const timeInYears = duration / 12;
  const n = parseInt(compoundFrequency); // times compounded per year

  const simpleInterest = (amount * rate * timeInYears) / 100;

  const compoundTotal =
    amount * Math.pow(1 + rate / (100 * n), n * timeInYears);
  const compoundInterest = compoundTotal - amount;

  const profit = type === "simple" ? simpleInterest : compoundInterest;
  const total = type === "simple" ? amount + simpleInterest : compoundTotal;

  return (
    <div className={`min-h-screen ${containerBg} flex items-center justify-center`}>
      <div className={`w-full max-w-md p-2 ${calculatorBg} ${shadow} rounded-xl`}>
        <h2 className={`text-2xl font-bold mb-4 text-center ${textColor}`}>
          Bank Deposit Profit Calculator
        </h2>

        <div className={`mt-6 p-4 ${cardBg} rounded text-center`}>
          <p className={`text-lg font-semibold ${profitColor}`}>
            📈 Total Profit: ৳{profit.toFixed(2)}
          </p>
          <p className={`text-lg font-semibold ${totalColor}`}>
            💰 Final Amount: ৳{total.toFixed(2)}
          </p>
        </div>

        <label className={`block ${labelColor} mb-2 mt-5`}>
          Deposit Amount (৳)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          className={`w-full p-2 border ${inputBorder} rounded mb-4 ${inputBg} ${inputText}`}
        />

        <label className={`block ${labelColor} mb-2`}>Interest Rate (%)</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(+e.target.value)}
          className={`w-full p-2 border ${inputBorder} rounded mb-4 ${inputBg} ${inputText}`}
        />

        <label className={`block ${labelColor} mb-2`}>Duration (Months)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(+e.target.value)}
          className={`w-full p-2 border ${inputBorder} rounded mb-4 ${inputBg} ${inputText}`}
        />

        <div className={`flex items-center gap-4 mb-4 ${radioColor}`}>
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
            <label className={`block ${labelColor} mb-2`}>
              Compound Frequency
            </label>
            <select
              value={compoundFrequency}
              onChange={(e) => setCompoundFrequency(e.target.value)}
              className={`w-full p-2 border ${inputBorder} rounded ${inputBg} ${inputText}`}
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