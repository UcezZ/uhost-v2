import Enumerable from "linq";
import Video from "../../../entities/Video";
import VideoCard from "../cards/VideoCard";

export default function VideoCardContainer({ collection }) {
    if (collection) {
        return (
            <div className="card-wrapper flex-wrap">
                {Enumerable
                    .from(collection)
                    .select(e => <VideoCard video={e} />)
                }
            </div>
        );
    }
}