import { useContext } from 'react';
import StateContext from '../../../context/StateContext';
import { Link } from 'react-router-dom';
import DownloadIcon from './../../../img/download.svg';
import QueueBlock from './QueueBlock';
import CommentsBlock from './CommentsBlock';

export default function VideoBlock({ video }) {
    const { token, locale } = useContext(StateContext);

    return (
        <div className="page-video-wrapper card-wrapper">
            <div className="player-wrapper content-wrapper">
                <div className="video-wrapper">
                    <video poster={video.getThumbUrl(token)} controls>
                        <source src={video.getVideoUrl(token)} type="video/mp4" />
                    </video>
                </div>
                <div className="video-footer">
                    <div className="video-summary">
                        <Link className="user" to={`/profile?id=${video.getUserId()}`}>{video.user.name}</Link>
                        <div className="name">{video.getName()}</div>
                        <div className="info">
                            <i>{locale.getValue('common.posttime')}: {video.getHumanTime()}</i>
                            <i>{locale.getValue('video.duration')}: {video.getHumanDuration()}</i>
                        </div>
                    </div>
                    <div className="video-actions">
                        <div className="action-wrapper">
                            <a href={video.getDownloadUrl(token)}>
                                <img src={DownloadIcon} />
                                <span>{locale.getValue('common.download')}</span>
                            </a>
                        </div>
                        {/* <?php
                if (isset($currentuser)) {
                    require __DIR__ . '/block-videoaddtopls.php';
                }
                if (isset($currentuser) && ($currentuser.isAdmin() || $currentuser.getId() == $video.getUserId())) {
                    require __DIR__ . '/block-videomanage.php';
                }
                } */}
                    </div>
                </div>
            </div>
            <QueueBlock />
            <CommentsBlock />
        </div>
    );
}