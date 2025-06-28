import { useState, useEffect } from "react";
import instance from "../../utils/axios";
import { URLS } from "../../constants/apiRoute";

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const [lastDeduction, setLastDeduction] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const getBalance = await instance(URLS.GET_BALANCE, balance);
        setBalance(getBalance.data.availableBalance);
        setLastDeduction(getBalance.data.lastDeducted);
      } catch (err) {
        console.error("Error fetching balance:", err.message);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div className="flex flex-col gap-4 mt-4 px-4">
      <div className="bg-white shadow p-4 rounded-xl flex justify-center items-center flex-col">
        <h2 className="text-lg font-bold">Available Balance</h2>
        <p className="text-2xl text-green-600">
          Rs. {(Number(balance) || 0).toLocaleString()}
        </p>
      </div>
      <div className="bg-white shadow p-4 rounded-xl flex justify-center items-center flex-col">
        <h2 className="text-lg font-bold">Last Deducted</h2>
        <p className="text-2xl text-red-600">
          Rs. {(Number(lastDeduction) || 0).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Balance;
