import './../../css/card.css'
import './../../css/form.css'
import './../../css/card-state.css'
import './../../css/bigredbutton.css'
import './../../css/toggle.css'
import './../../css/form-editor.css'
import './../../css/item-comment.css'
import './../../css/page-video.css'

import StateContext from "../../context/StateContext";
import { useContext, useEffect, useState } from "react";
import LoadingContainer from "../items/containers/LoadingContainer";
import ApiService from "../../services/ApiService";
import Enumerable from "linq";
import VideoCardContainer from "../items/containers/VideoCardContainer";
import Video from "../../entities/Video";
import BigRedButt from '../items/BigRedButt';
import { useSearchParams, useLocation } from 'react-router-dom';
import VideoBlock from '../items/blocks/VideoBlock';
import ErrorCard from '../items/cards/ErrorCard';

export default function VideoPage() {
    const { token, user, locale } = useContext(StateContext);
    const [view, setView] = useState(<LoadingContainer />);
    const [search, setSearch] = useSearchParams();
    const [needsRender, setNeedsRender] = useState(false);
    const location = useLocation();

    useEffect(() => { setNeedsRender(true) }, [location]);

    let alias = search.has('v') && search.get('v').length > 0 && search.get('v').length < 9 ? search.get('v') : null;

    if (alias && needsRender) {
        setNeedsRender(false);
        ApiService.getVideoByAlias(
            token,
            alias,
            e => setView(<VideoBlock video={e} />),
            e => setView(<ErrorCard error={e} />)
        );
    }
    else if (user) {
        let userId = search.has('u') && Number(search.get('u')) ? Number(search.get('u')) : user.id;

        function renderVideos(res) {
            console.log(res);
            setView(
                <div className="main">
                    <BigRedButt to={''} caption={locale.getValue('video.add')} subStyle={'add-video-icon'} />
                    <VideoCardContainer collection={Enumerable.from(res.data).select(e => new Video(e))} />
                </div>
            );
        }

        if (needsRender) {
            setNeedsRender(false);
            ApiService.getUserVideos(token, userId, 1, renderVideos);
        }
    }

    return <div className="main">{view}</div>;
}