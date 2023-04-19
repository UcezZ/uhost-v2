import { useContext } from "react";
import { Link } from "react-router-dom";
import StateContext from "../../../context/StateContext";
import Video from "../../../entities/Video"

export default function VideoCard({ video, playlistId }) {
    const { token } = useContext(StateContext);

    if (video instanceof Video) {
        return (
            <div className="card video">
                <div className="card-header flex">
                    <Link className="video-preview" to={`/video?v=${video.getAlias() + (playlistId && playlistId > 0 ? `&p=${playlistId}` : '')}`}>
                        <img className="video-preview" src={video.getThumbUrl(token)} />
                        <span>{video.getHumanDuration()}</span>
                    </Link>
                </div>
                <div className="card-body">
                    <div className="video-summary">
                        <div className="user">{video.user.name}</div>
                        <div className="name">{video.getName()}</div>
                    </div>
                </div>
            </div>
        );
    }
}