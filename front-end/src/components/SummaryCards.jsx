import React from "react";

const SummaryCards = ({ label, amount, color }) => {
  return (
    <div className={`p-4 rounded-xl shadow ${color}`}>
      <h3 className="text-gray-700 text-sm">{label}</h3>
      <p className="text-xl font-semibold text-gray-800">
        Rs{amount.toLocaleString()}
      </p>
    </div>
  );
};

export default SummaryCards;
