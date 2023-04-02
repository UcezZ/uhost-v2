import './../../css/card.css';
import './../../css/form.css';
import './../../css/form-search.css';
import './../../css/page-video.css';

import SearchBlock from '../items/SearchBlock';
import React, { useContext, useEffect, useState } from 'react';
import LoadingContainer from '../items/containers/LoadingContainer';
import ApiService from '../../services/ApiService';
import VideoCardContainer from '../items/containers/VideoCardContainer';
import Enumerable from 'linq';
import Video from '../../entities/Video';
import StateContext from '../../context/StateContext';

export default function MainPage() {
    const [videoContainer, setVideoContainer] = useState(<LoadingContainer />);
    const { token } = useContext(StateContext);

    function renderVideos(res) {
        setVideoContainer(<VideoCardContainer collection={Enumerable.from(res.data).select(e => new Video(e))} />);
    }

    useEffect(() => {
        ApiService.getRandomVideos(token, renderVideos);
    }, [token]);

    if (videoContainer.type.name === 'LoadingContainer') {
        ApiService.getRandomVideos(token, renderVideos);
    }

    return (
        <div>
            <SearchBlock />
            <div className="main">
                {videoContainer}
            </div>
        </div>
    );
}