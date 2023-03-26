import { Link } from "react-router-dom";
import Video from "../../../entities/Video"

export default function VideoCard({ video }) {
    if (video instanceof Video) {
        console.log(video);
        return (
            <div class="card video">
                <div class="card-header flex">
                    <Link class="video-preview" to={`/video?v=${video.getAlias()}`}>
                        <img class="video-preview" src={video.getThumbUrl()} />
                        <span>{video.getHumanDuration()}</span>
                    </Link>
                </div>
                <div class="card-contents">
                    <div class="video-summary">
                        <div class="user">{video.user.name}</div>
                        <div class="name">{video.getName()}</div>
                    </div>
                </div>
            </div>
        );
    }
}