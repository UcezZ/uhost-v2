import './../../css/card.css';
import './../../css/form.css';
import './../../css/form-search.css';
import './../../css/page-video.css';

import SearchBlock from '../items/SearchBlock';
import React, { useState } from 'react';
import LoadingContainer from '../items/containers/LoadingContainer';
import ApiService from '../../services/ApiService';
import VideoContainer from '../items/containers/VideoContainer';
import Enumerable from 'linq';
import Video from '../../entities/Video';

export default function MainPage() {
    const [videoContainer, setVideoContainer] = useState(<LoadingContainer />);

    function renderVideos(res) {
        setVideoContainer(<VideoContainer collection={Enumerable.from(res.data).select(e => new Video(e))} />);
    }

    if (videoContainer.type.name === 'LoadingContainer') {
        ApiService.getRandomVideos(renderVideos);
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