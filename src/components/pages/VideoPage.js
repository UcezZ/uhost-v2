import './../../css/card.css';
import './../../css/form.css';
import './../../css/card-state.css';
import './../../css/toggle.css';
import './../../css/item-comment.css';
import './../../css/page-video.css';

import StateContext from "../../context/StateContext";
import { useContext, useEffect, useState } from "react";
import LoadingContainer from "../containers/LoadingContainer";
import ApiService from "../../services/ApiService";
import Enumerable from "linq";
import VideoCardContainer from "../containers/VideoCardContainer";
import Video from "../../entities/Video";
import BigRedButt from '../items/BigRedButt';
import { useSearchParams, useLocation } from 'react-router-dom';
import ErrorCard from '../cards/ErrorCard';
import VideoUploadCard from '../cards/VideoUploadCard';
import ReactModal from 'react-modal';
import Common from '../../Common';
import VideoBlock from '../blocks/VideoBlock';
import QueueBlock from '../blocks/QueueBlock';
import CommentsBlock from '../blocks/CommentsBlock';
import Redirect from '../Redirect';
import PagedResultNavigator from '../items/PagedResultNavigator';

export default function VideoPage() {
    const { token, user, locale } = useContext(StateContext);
    const [view, setView] = useState(<LoadingContainer />);
    const [search] = useSearchParams();
    const [needsRender, setNeedsRender] = useState(false);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [page, setPage] = useState(1);
    const location = useLocation();

    useEffect(() => setNeedsRender(true), [location, uploadVisible, page]);

    let alias = search.has('v') && search.get('v').length > 0 && search.get('v').length < 9 ? search.get('v') : null;

    if (alias && needsRender) {
        setNeedsRender(false);
        ApiService.getVideoByAlias(
            token,
            alias,
            e => setView(
                <div className="page-video-wrapper card-wrapper">
                    <VideoBlock video={e} />
                    <QueueBlock video={e} />
                    <CommentsBlock key={e.getAlias()} video={e} />
                </div>
            ),
            e => setView(<div className="card-wrapper"><ErrorCard error={e} /></div>)
        );
    }
    else if (user) {
        let userId = search.has('u') && Number(search.get('u')) ? Number(search.get('u')) : user.id;

        function closeVideoUpload(e) {
            setUploadVisible(false);
        }

        function pagedNavigator(e) {
            if (e.totalpages > 1) {
                return <PagedResultNavigator page={page} setPage={setPage} total={e.totalpages} />
            }
        }

        function renderVideos(res) {
            setView(
                <div className="main">
                    <BigRedButt caption={locale.getValue('video.add')} subStyle={'add-video-icon'} onClick={e => setUploadVisible(true)} />
                    {pagedNavigator(res)}
                    <VideoCardContainer collection={Enumerable.from(res.data).select(e => new Video(e))} />
                    {pagedNavigator(res)}
                    <ReactModal className="card-wrapper" isOpen={uploadVisible} style={Common.getModalInlineStyles()} ariaHideApp={false}>
                        <VideoUploadCard onClose={closeVideoUpload} />
                    </ReactModal>
                </div>
            );
        }

        if (needsRender) {
            setNeedsRender(false);
            ApiService.getUserVideos(token, userId, page, renderVideos);
        }
    } else if (!user && !alias) {
        return <Redirect />;
    }

    return <div className="main">{view}</div>;
}