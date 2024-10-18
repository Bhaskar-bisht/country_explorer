/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { currencyAPI, currencyExchangeAPI } from "../utils/api";

const CurrencyExchange = () => {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [exchangeRate, setExchangeRate] = useState(1);
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch available currencies and exchange rate
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const res = await axios.get(
                    `${currencyAPI}` // Use your preferred currency exchange API
                );
                setCurrencies(Object.keys(res.data.rates));
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        };

        fetchCurrencies();
    }, []);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`${currencyExchangeAPI}/${fromCurrency}`);
                setExchangeRate(res.data.rates[toCurrency]);
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (fromCurrency && toCurrency) fetchExchangeRate();
    }, [fromCurrency, toCurrency]);

    const handleConversion = () => {
        setConvertedAmount(amount * exchangeRate);
    };

    return (
        <div className=" relative flex h-[90vh] flex-col items-center justify-center bg-gray-100 p-5">
            <div className=" absolute top-3 left-2">
                <Link to={"/"}>
                    <IoIosArrowRoundBack size={40} />
                </Link>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">Currency Exchange</h1>

            {/* Exchange Form */}
            <div className="bg-white shadow-lg p-6 rounded-lg max-w-lg w-full">
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-5 grid grid-cols-2 gap-4">
                    {/* From Currency */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">From</label>
                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                        >
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* To Currency */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">To</label>
                        <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none "
                        >
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className=" md:flex justify-between items-center">
                    {/* Exchange Rate Display */}
                    <div className="mb-5 w-full">
                        <p className="text-sm font-semibold text-green-600">
                            {isLoading
                                ? "Fetching exchange rate..."
                                : `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`}
                        </p>
                    </div>

                    {/* Convert Button */}
                    <button
                        onClick={handleConversion}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Convert
                    </button>
                </div>
                {/* Converted Amount */}
                <div className="mt-5">
                    <p className="text-xl font-semibold">
                        {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CurrencyExchange;
