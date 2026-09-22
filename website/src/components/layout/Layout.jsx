import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Loader from "../common/generic/Loader";

const Layout = () => {
    const location = useLocation();

    return (
        <div className="w-full flex">
            <div className="w-5 bordr">
                <Sidebar />
            </div>
            <div className="w-95 h-100 overflow-auto bg-forth">
                <Header />
                <div key={location.key}>
                    <Suspense fallback={<Loader />}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default Layout;