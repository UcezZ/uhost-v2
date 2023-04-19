import { useContext, useState } from "react";
import StateContext from "../../context/StateContext";
import AdminSessionCard from "../items/cards/AdminSessionCard";
import AdminStatsCard from "../items/cards/AdminStatsCard";
import AdminUsersCard from "../items/cards/AdminUsersCard";
import LogCard from '../items/cards/LogCard';

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