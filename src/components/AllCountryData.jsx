/** @format */

import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";

const AllCountryData = ({ contries }) => {
    return (
        <>
            <div className=" flex items-center justify-center mx-auto lg:py-5 lg:px-16 px-4">
                {contries?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {contries?.map((country) => (
                            <div
                                key={country?.cca3}
                                className="max-w-sm mx-auto py-5  h-full w-full min-h-[400px] flex flex-col"
                            >
                                <div className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
                                    <div className=" border rounded-md p-1">
                                        <img
                                            className=" w-full object-center h-40 rounded-lg"
                                            src={country?.flags?.png}
                                            alt={`${country?.name?.common} flag`}
                                        />
                                    </div>
                                    <div className="py-4 px-6 rounded-lg bg-white">
                                        <Link to={`/country/${country?.name?.common}`}>
                                            <h1 className="text-gray-700 font-bold text-2xl mb-3 hover:text-gray-900">
                                                {country?.name?.common}
                                            </h1>
                                        </Link>

                                        {country?.capital && (
                                            <p className="text-gray-700">
                                                <span className=" text-md font-semibold">Captical :</span>{" "}
                                                {country?.capital}
                                            </p>
                                        )}

                                        <p className="text-gray-700">
                                            <span className=" text-md font-semibold">Population :</span>{" "}
                                            {country?.population}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className=" text-md font-semibold">Region :</span> {country?.region}
                                        </p>
                                        <Link to={`/country/${country?.name?.common}`}>
                                            <button className="flex justify-center items-center gap-2 mt-6 py-2 px-4 bg-gray-100 text-gray-800 font-semibold rounded-md shadow-md hover:shadow-lg transition duration-300">
                                                <span>read more</span>
                                                <FaArrowRightLong />
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="absolute top-2 right-2 px-2 bg-gray-100 rounded-lg">
                                        <span className="text-md">{country?.altSpellings?.[0]}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <NotFound />
                )}
            </div>
        </>
    );
};

export default AllCountryData;
