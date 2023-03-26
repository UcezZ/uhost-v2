import './../../fonts/productsans.css'
import './../../css/styles.css'
import './../../css/card.css'
import './../../css/form.css'
import './../../css/card-state.css'
import './../../css/bigredbutton.css'
import './../../css/toggle.css'
import './../../css/form-editor.css'
import './../../css/item-comment.css'
import './../../css/page-video.css'

import StateContext from "../../context/StateContext";
import { useContext, useState } from "react";
import Header from "../items/Header";
import LoadingContainer from "../items/containers/LoadingContainer";
import ApiService from "../../services/ApiService";
import Enumerable from "linq";
import VideoContainer from "../items/containers/VideoContainer";
import Video from "../../entities/Video";

export default function VideoPage() {
    const { locale } = useContext(StateContext);
    const { user } = useContext(StateContext);
    const [component, setComponent] = useState(<LoadingContainer />);
    const searchParams = window.location.searchParams;

    function renderVideos(res) {
        setComponent(<VideoContainer collection={Enumerable.from(res.data).select(e => new Video(e))} />);
    }

    if (component.type.name === 'LoadingContainer') {
        ApiService.getRandomVideos(renderVideos);
    }

    return <div className="main">{component}</div>;
}