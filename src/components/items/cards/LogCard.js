import { useContext, useEffect, useState } from "react";
import StateContext from "../../../context/StateContext";
import ErrorCard from "./ErrorCard";
import ApiService from "../../../services/ApiService";
import LoadingContainer from "../containers/LoadingContainer";
import Enumerable from "linq";
import { Link } from "react-router-dom";
import ErrorDialog from "../dialogs/ErrorDialog";
import PagedResultNavigator from "../PagedResultNavigator";
import LogItem from "../LogItem";

export default function AdminSessionCard() {
    const { token, locale } = useContext(StateContext);
    const [ready, setReady] = useState(false);
    const [view, setView] = useState(<div className="card-body"><LoadingContainer /></div>);
    const [modal, setModal] = useState();
    const [page, setPage] = useState(1);
    const [navi, setNavi] = useState();

    function terminate(tk) {
        ApiService.terminateSession(
            token,
            tk,
            e => setReady(false),
            e => setModal(<ErrorDialog error={e} onSubmit={e => setModal()} />)
        );
    }

    useEffect(() => setReady(false), [page]);

    function onSuccess(e) {
        setView(
            <table className="card-body">
                <thead>
                    <td>{locale.getValue('common.id')}</td>
                    <td>{locale.getValue('admin.session.user')}</td>
                    <td>{locale.getValue('admin.session.action')}</td>
                </thead>
                <tbody>
                    {
                        Enumerable
                            .from(e.data)
                            .select(l => <LogItem data={l} />)
                    }
                </tbody>
            </table>
        );
        if (page > e.totalpages) {
            setPage(e.totalpages > 1 ? e.totalpages - 1 : 1);
        }
        setNavi(<PagedResultNavigator page={page} setPage={setPage} total={e.totalpages} />);
    }

    function onError(e) {
        setView(<ErrorCard error={e} />);
        setNavi();
    }

    if (!ready && locale.user) {
        setReady(true);
        ApiService.getAdminData(
            token,
            'log',
            page,
            10,
            onSuccess,
            onError
        );
    }

    return (
        <div className="card wide table hscroll">
            <div className="card-header">{locale.getValue('admin.stats.logs')}</div>
            {view}
            {navi}
            {modal}
        </div>
    );
}