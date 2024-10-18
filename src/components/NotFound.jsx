/** @format */

import React from "react";
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
    return (
        <>
            <div className=" w-full h-full">
                <div className=" flex flex-col items-center relative justify-center h-[80vh]">
                    <TbError404 className=" text-8xl" />
                    <p className=" text-2xl">country not found...</p>
                </div>
            </div>
        </>
    );
};

export default NotFound;
