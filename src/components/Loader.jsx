/** @format */

import React from "react";
import icon from "../assets/earth-svgrepo-com.svg";

const Loader = () => {
    return (
        <>
            <div className="relative flex h-screen justify-center items-center">
                <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                <img src={icon} alt="loader_icon" className="  rounded-full h-32 w-fit" />
            </div>
        </>
    );
};

export default Loader;
