import { useContext, useState } from "react";
import StateContext from "../../context/StateContext";
import AdminSessionCard from "../cards/AdminSessionCard";
import AdminStatsCard from "../cards/AdminStatsCard";
import AdminUsersCard from "../cards/AdminUsersCard";
import LogCard from '../cards/LogCard';

export default function AdminPage() {
    const { token } = useContext(StateContext);

    return (
        <div className="main">
            <div className="card-wrapper">
                <AdminStatsCard />
            </div>
            <div className="card-wrapper">
                <AdminSessionCard />
            </div>
            <div className="card-wrapper">
                <LogCard />
            </div>
            <div className="card-wrapper big">
                <AdminUsersCard />
            </div>
        </div>
    );
}