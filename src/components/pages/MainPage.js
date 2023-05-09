import './../../css/card.css';
import './../../css/form.css';
import './../../css/form-search.css';
import './../../css/page-video.css';

import SearchBlock from '../items/SearchBlock';
import React, { useContext, useEffect, useState } from 'react';
import LoadingContainer from '../containers/LoadingContainer';
import ApiService from '../../services/ApiService';
import VideoCardContainer from '../containers/VideoCardContainer';
import Enumerable from 'linq';
import Video from '../../entities/Video';
import StateContext from '../../context/StateContext';
import ErrorCard from '../cards/ErrorCard';
import PagedResultNavigator from '../items/PagedResultNavigator';

export default function MainPage() {
    const [view, setView] = useState(<LoadingContainer />);
    const { token } = useContext(StateContext);
    const [query, setQuery] = useState();
    const [navi, setNavi] = useState();
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (query) {
            ApiService.searchVideos(token, query, page, renderVideos, renderError);
        } else {
            ApiService.getRandomVideos(token, renderVideos, renderError);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, query, page]);

    function renderVideos(res) {
        setNavi(<PagedResultNavigator page={page} setPage={setPage} total={res.totalpages} />);
        setView(<VideoCardContainer collection={Enumerable.from(res.data).select(e => new Video(e))} />);
    }

    function renderError(e) {
        setNavi();
        setView(
            <div className="card-wrapper">
                <ErrorCard error={e} />
            </div>
        );
    }
    return (
        <div>
            <SearchBlock query={query} setQuery={setQuery} setPage={setPage} />
            <div className="main">
                {navi}
                {view}
                {navi}
            </div>
        </div>
    );
}