import './../../css/card.css';
import './../../css/form.css';
import './../../css/card-state.css';
import './../../css/toggle.css';
import './../../css/playlist.css';

import { useContext, useState } from "react";
import LoadingContainer from "../containers/LoadingContainer";
import StateContext from '../../context/StateContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import Enumerable from 'linq';
import PlaylistCard from '../cards/PlaylistCard';
import ErrorCard from '../cards/ErrorCard';
import BigRedButt from '../items/BigRedButt';
import PlaylistCreateDialog from '../dialogs/PlaylistCreateDialog';

export default function PlaylistPage() {
    const { token, locale, user } = useContext(StateContext);
    const [view, setView] = useState(<LoadingContainer />);
    const [modal, setModal] = useState();
    const [ready, setReady] = useState(false);
    const [search,] = useSearchParams();
    const navigate = useNavigate();

    if (!user) {
        navigate('/');
    }

    if (!ready) {
        setReady(true);
        let id = search.has('u') && Number(search.get('u')) > 0 ? Number(search.get('u')) : 0;
        ApiService.getPlaylists(
            token,
            id,
            e => setView(
                <div className="card-wrapper playlist-wrapper">
                    {
                        Enumerable
                            .from(e)
                            .select(p => <PlaylistCard playlist={p} />)
                    }
                </div>
            ),
            e => setView(<div class="card-wrapper"><ErrorCard error={e} /></div>)
        );
    }

    return (
        <div className="main">
            <BigRedButt caption={locale.getValue('playlist.add')} subStyle={'add-playlist-icon'} onClick={e => setModal(<PlaylistCreateDialog onClose={ev => { setModal(); setReady(false); }} />)} />
            {view}
            {modal}
        </div>
    );
}