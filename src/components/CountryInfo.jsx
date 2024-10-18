/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiURI } from "../utils/api";
import NotFound from "./NotFound";

const CountryInfo = () => {
    const [singleCountry, setSingleCountry] = useState([0]);

    const { countryname } = useParams();

    useEffect(() => {
        const getCountryByName = async () => {
            try {
                const res = await axios.get(`${apiURI}/name/${countryname}`);

                if (!res.data || res.data.length === 0) {
                    return toast.error("Something went wrong.");
                }

                const exactCountry = res.data.find(
                    (country) => country.name.common.toLowerCase() === countryname.toLowerCase()
                );

                if (exactCountry) {
                    setSingleCountry(exactCountry);
                } else {
                    setSingleCountry(res.data[0]); // Use the first result as a fallback
                }
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        };

        getCountryByName();
    }, [countryname]);

    if (!singleCountry) {
        return <NotFound />;
    }

    return (
        <>
            <div className=" flex top-5 relative ">
                <div className=" absolute top-3 left-2">
                    <Link to={"/"}>
                        <IoIosArrowRoundBack size={40} />
                    </Link>
                </div>
                <div className=" mx-auto px-4 py-12">
                    <div className=" md:flex justify-center ">
                        {/* Product Images */}
                        <div className="w-full flex flex-col justify-center items-center py-8 md:w-96 px-4 mb-8">
                            <img
                                src={singleCountry?.flags?.png}
                                alt={`${singleCountry?.name?.common} flag`}
                                title={`${singleCountry?.name?.common} flag`}
                                className="w-fit h-auto rounded-lg shadow-md mb-4 cursor-pointer transform transition  ease-in-out hover:scale-110 duration-500"
                            />

                            {singleCountry?.coatOfArms?.png && (
                                <div className="flex w-full gap-4 py-4 justify-center overflow-x-auto">
                                    {" "}
                                    <img
                                        src={singleCountry.coatOfArms?.png}
                                        alt={`${singleCountry?.name?.common} coat of arms`}
                                        title={`${singleCountry?.name?.common} coat of arms`}
                                        className="w-16 sm:w-20 object-cover rounded-md cursor-pointer transform transition  ease-in-out hover:scale-110 duration-500"
                                        onClick={() => changeImage(singleCountry.coatOfArms?.png)}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="w-full md:w-1/2 px-4">
                            <h4 className=" text-3xl font-bold mb-2">{singleCountry?.name?.official}</h4>
                            <h2 className=" text-xl font-bold mb-1">{singleCountry?.name?.common}</h2>

                            <div className="  justify-between w-full md:flex  py-4">
                                <div className=" w-full">
                                    {singleCountry?.capital && (
                                        <p className="text-gray-600 mb-1">
                                            <span className=" text-md text-black font-semibold">Captical :</span>{" "}
                                            {singleCountry?.capital}
                                        </p>
                                    )}

                                    <p className="text-gray-700 mb-1">
                                        <span className=" text-md font-semibold">Population :</span>{" "}
                                        {singleCountry?.population}
                                    </p>
                                    <p className="text-gray-700 mb-1">
                                        <span className=" text-md font-semibold">Region :</span> {singleCountry?.region}
                                    </p>
                                </div>
                                <div className=" w-full">
                                    {singleCountry?.currencies && (
                                        <p className="text-gray-700 mb-1">
                                            <span className=" text-md font-semibold">Currencie : </span>
                                            {Object.values(singleCountry.currencies)[0].name}
                                        </p>
                                    )}
                                    {singleCountry?.currencies && (
                                        <p className="text-gray-700 mb-1">
                                            <span className=" text-md font-semibold"> Currencie Symbol : </span>
                                            {Object.values(singleCountry.currencies)[0].symbol}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {singleCountry?.flags?.alt ? (
                                <p className="text-gray-700 mb-6">
                                    <span className=" text-md font-semibold">Country Flag Overview :</span>
                                    <br />
                                    {singleCountry?.flags?.alt}
                                </p>
                            ) : (
                                <p className="text-gray-700 mb-6">
                                    Country flag overview not available for the selected country. Please try another
                                    country or check back later for updates.
                                </p>
                            )}

                            {singleCountry?.languages && (
                                <div className=" flex items-center text-gray-700 mb-6 border-b-2 py-4 ">
                                    <span className=" text-md font-semibold mr-2">languages:</span>
                                    <ul className=" flex flex-wrap gap-4">
                                        {singleCountry?.languages &&
                                            Object.values(singleCountry.languages).map((lang, index) => (
                                                <li
                                                    key={index}
                                                    className=" bg-gray-200 rounded-md px-2 py-1 font-semibold"
                                                >
                                                    #{lang}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}

                            {singleCountry?.borders && (
                                <div className=" text-gray-700 flex items-center mb-1 ">
                                    <span className=" text-md font-semibold mr-2">Country Borders:</span>
                                    <ul className=" flex flex-wrap gap-4 ">
                                        {singleCountry?.borders?.map((bord, index) => (
                                            <li key={index} className=" bg-gray-200 rounded-md px-2 py-1 font-semibold">
                                                {bord}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* </div> */}
        </>
    );
};

export default CountryInfo;
