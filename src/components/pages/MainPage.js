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

    function renderVideos(res) {
        setNavi(pagedNavigator(res));
        setView(
            <VideoCardContainer collection={Enumerable.from(res.data).select(e => new Video(e))} />
        );
    }

    function renderError(e) {
        setNavi();
        setView(
            <div className="card-wrapper">
                <ErrorCard error={e} />
            </div>
        );
    }

    function pagedNavigator(e) {
        if (e.totalpages > 1) {
            return <PagedResultNavigator page={page} setPage={setPage} total={e.totalpages} />
        }
    }

    useEffect(() => {
        if (query) {
            ApiService.searchVideos(token, query, page, renderVideos, renderError);
        } else {
            ApiService.getRandomVideos(token, renderVideos, renderError);
        }
    }, [token, query, page]);

    return (
        <div>
            <SearchBlock query={query} setQuery={setQuery} />
            <div className="main">
                {navi}
                {view}
                {navi}
            </div>
        </div>
    );
}