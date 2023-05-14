import AdminSessionCard from "../cards/AdminSessionCard";
import AdminStatsCard from "../cards/AdminStatsCard";
import AdminUsersCard from "../cards/AdminUsersCard";
import AdminLogCard from '../cards/AdminLogCard';

export default function AdminPage() {

    return (
        <div className="main">
            <div className="card-wrapper">
                <AdminStatsCard />
            </div>
            <div className="card-wrapper">
                <AdminSessionCard />
            </div>
            <div className="card-wrapper">
                <AdminLogCard />
            </div>
            <div className="card-wrapper big">
                <AdminUsersCard />
            </div>
        </div>
    );
}