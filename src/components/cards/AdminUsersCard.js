import { useState, useContext, useEffect } from 'react';
import StateContext from '../../context/StateContext';
import LoadingContainer from '../containers/LoadingContainer';
import ApiService from '../../services/ApiService';
import ErrorCard from './ErrorCard';
import PagedResultNavigator from '../items/PagedResultNavigator';
import Enumerable from 'linq';
import User from '../../entities/User';
import UserCard from './UserCard';

export default function AdminUsersCard() {
    const { token, locale } = useContext(StateContext);

    const [view, setView] = useState(<LoadingContainer />);
    const [page, setPage] = useState(1);
    const [navi, setNavi] = useState();
    const [ready, setReady] = useState(false);

    useEffect(() => setReady(false), [page]);

    function render(e) {
        setView(
            Enumerable
                .from(e.data)
                .select(u => <UserCard key={u.id} entity={new User(u)} />)
        );
        setNavi(<PagedResultNavigator page={page} setPage={setPage} total={e.totalpages} />);
    }

    if (!ready && locale.user) {
        setReady(true);
        ApiService.getAdminData(
            token,
            'users',
            page,
            4,
            render,
            e => setView(<ErrorCard error={e} />)
        );
    }

    return (
        <div className="card big">
            <div className="card-header">{locale.getValue('admin.users.caption')}</div>
            <div className="card-body">{view}</div>
            {navi}
        </div>
    );
}