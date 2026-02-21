/** @format */

import axios from "axios";
import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import "./App.css";
import CurrencyExchange from "./components/CurrencyExchange";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import { apiURI } from "./utils/api";

const AllCountryData = lazy(() => import("./components/AllCountryData"));
const CountryInfo = lazy(() => import("./components/CountryInfo"));
function App() {
    const [contries, setContries] = useState([]);
    const [searchCountry, setSearchCountry] = useState("");
    const [loader, setLoader] = useState(true);
const test = useState("");
    const getAllCountry = async () => {
        try {
            setLoader(true);
            const res = await axios.get(`${apiURI}/all`);

            if (!res) {
                return toast.error("somthing went wrong.");
            }

            setContries(res?.data);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        getAllCountry();
    }, []);

    const filterCountryByName = contries?.filter((country) =>
        country?.name?.common.toLowerCase().includes(searchCountry.toLowerCase())
    );

    const getCountryByRegion = async (regionName) => {
        try {
            if (regionName === "all") {
                return getAllCountry();
            }

            const res = await axios.get(`${apiURI}/region/${regionName}`);

            if (!res) {
                return toast.error("somthing went wrong.");
            }

            setContries(res.data);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <>
            <Suspense fallback={<Loader />}>
                {loader ? (
                    <Loader />
                ) : (
                    <>
                        <Navbar onSearchRegion={getCountryByRegion} onSearchFilter={setSearchCountry} />
                        <Routes>
                            <Route path="/" element={<AllCountryData contries={filterCountryByName} />} />
                            <Route path="/country/:countryname" element={<CountryInfo />} />
                            <Route path="/currency/exchange" element={<CurrencyExchange />} />
                        </Routes>
                    </>
                )}
            </Suspense>
        </>
    );
}

export default App;
