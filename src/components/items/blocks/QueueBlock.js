import { useContext, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import StateContext from '../../../context/StateContext';
import ApiService from '../../../services/ApiService';
import LoadingContainer from '../containers/LoadingContainer';
import Video from '../../../entities/Video';
import Enumerable from 'linq';
import VideoCard from '../cards/VideoCard';

export default function QueueBlock() {
    const { token, user, locale } = useContext(StateContext);
    const [view, setView] = useState(<LoadingContainer />);
    const [needsRender, setNeedsRender] = useState(false);
    const [search, setSearch] = useSearchParams();
    const location = useLocation();

    useState(() => { setNeedsRender(true) }, [location, user]);

    /**
     * 
     * @param {Number} playlist 
     * @param {Video[]} queue 
     */
    function showQueue(playlist, queue) {
        setView(
            Enumerable
                .from(queue)
                .select(e => <VideoCard video={e} playlistId={playlist} />)
        );
    }

    function noQueue(e) {
        setView(locale.getValue('video.queue.empty'));
    }

    let playlist = search.has('p') && Number(search.get('p')) ? Number(search.get('p')) : 0;
    let alias = search.has('v') ? search.get('v') : null;

    if (needsRender && alias) {
        setNeedsRender(false);
        ApiService.getQueue(token, alias, playlist, showQueue, noQueue);
    }

    return (
        <div className="queue-wrapper content-wrapper card">
            <div className="card-header">{locale.getValue('video.queue')}</div>
            <div className="card-contents card-wrapper">{view}</div>
        </div>
    );
}