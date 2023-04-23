import { useState, useContext } from 'react';
import StateContext from '../../context/StateContext';
import LoadingContainer from '../containers/LoadingContainer';
import ApiService from '../../services/ApiService';
import ErrorCard from './ErrorCard';

export default function AdminStatsCard() {
    const { token, locale } = useContext(StateContext);

    const [view, setView] = useState(<div className="card-body"><LoadingContainer /></div>);
    const [ready, setReady] = useState(false);

    if (!ready && locale.user) {
        setReady(true);
        ApiService.getAdminData(
            token, 'stats', 1, 1,
            e => setView(
                <table className="card-body">
                    <tbody>
                        <tr>
                            <td>{locale.getValue('admin.stats.videos')}</td>
                            <td>{e.videos ?? 0}</td>
                        </tr>
                        <tr>
                            <td>{locale.getValue('admin.stats.users')}</td>
                            <td>{e.users ?? 0}</td>
                        </tr>
                        <tr>
                            <td>{locale.getValue('admin.stats.playlists')}</td>
                            <td>{e.playlists ?? 0}</td>
                        </tr>
                        <tr>
                            <td>{locale.getValue('admin.stats.comments')}</td>
                            <td>{e.comments ?? 0}</td>
                        </tr>
                        <tr>
                            <td>{locale.getValue('admin.stats.sessions')}</td>
                            <td>{e.sessions ?? 0}</td>
                        </tr>
                        <tr>
                            <td>{locale.getValue('admin.stats.events')}</td>
                            <td>{e.events ?? 0}</td>
                        </tr>
                    </tbody>
                </table>
            ),
            e => setView(<ErrorCard error={e} />)
        );
    }

    return (
        <div className="card">
            <div className="card-header">{locale.getValue('admin.stats.caption')}</div>
            {view}
        </div>
    );
}