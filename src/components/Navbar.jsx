/** @format */

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = ({ onSearchFilter, onSearchRegion }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = (e) => {
        const searchCountry = e.target.value;
        onSearchFilter(searchCountry);
    };

    const handleRegionSearch = (e) => {
        const regionName = e.target.value;
        onSearchRegion(regionName);
    };

    const listOfRegion = [
        { _id: 1, name: "Africa" },
        { _id: 2, name: "Americas" },
        { _id: 3, name: "Asia" },
        { _id: 4, name: "Europe" },
        { _id: 5, name: "Oceania" },
        { _id: 6, name: "Antarctica" },
        { _id: 7, name: "Arctic" },
    ];

    return (
        <>
            <nav className="bg-gray-800 p-4 sticky top-0 z-50">
                <div className="mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-white text-2xl font-bold">
                        <Link to="/">G | C | E</Link>
                    </div>

                    <div className="flex gap-6">
                        {/* Search Box (hidden on mobile) */}
                        <div className="hidden md:flex items-center bg-gray-700 px-4 rounded-lg">
                            <input
                                type="text"
                                placeholder="Search country..."
                                onChange={handleSearch}
                                className="bg-transparent w-full outline-none text-white placeholder-gray-400 px-2"
                            />
                            <FaSearch className="text-white ml-2 cursor-pointer" />
                        </div>

                        {/* country Selector by region */}

                        <div className="hidden md:flex items-center justify-center bg-gray-700 px-4 rounded-lg">
                            <select
                                onChange={handleRegionSearch}
                                className="bg-gray-700 focus:outline-none cursor-pointer text-white py-2 px-2 border-none"
                            >
                                <option value="all">All Region</option>
                                {listOfRegion?.map((region) => (
                                    <option
                                        key={region._id}
                                        value={region?.name}
                                        className=" bg-gray-700 cursor-pointer hover:bg-gray-400"
                                    >
                                        {region?.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Buttons (hidden on mobile) */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* <FilterCountry /> */}
                            <Link
                                to={"/currency/exchange"}
                                // className="bg-blue-600 text-white px-4 py-2 rounded-lg flex justify-center items-center"
                                className="w-full flex justify-center items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                <MdOutlineCurrencyExchange className="mr-2" />
                                Currency exc..
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white">
                            {isOpen ? <IoCloseSharp size={28} /> : <FaBarsStaggered size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4">
                        {/* Search Box */}
                        <div className="flex items-center justify-between bg-gray-700 p-2 rounded-lg mb-4">
                            <input
                                type="text"
                                placeholder="Search country..."
                                onChange={handleSearch}
                                className="bg-transparent w-full outline-none text-white placeholder-gray-400 px-3"
                            />
                            <FaSearch className="text-white ml-4 cursor-pointer" />
                        </div>

                        {/* country Selector by region */}
                        <select
                            onChange={handleRegionSearch}
                            className="bg-gray-700 focus:outline-none text-white p-2 cursor-pointer rounded-lg w-full mb-4"
                        >
                            <option value="all">All Region</option>
                            {listOfRegion?.map((region) => (
                                <option
                                    key={region._id}
                                    value={region?.name}
                                    className=" bg-gray-700 cursor-pointer hover:bg-gray-400"
                                >
                                    {region?.name}
                                </option>
                            ))}
                        </select>

                        {/* Login Button */}
                        <Link
                            to={"/currency/exchange"}
                            className="bg-blue-600 text-white py-2 flex items-center justify-center rounded-lg w-full"
                        >
                            <MdOutlineCurrencyExchange size={20} className="mr-2 inline" />
                            Currency Exchange
                        </Link>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
