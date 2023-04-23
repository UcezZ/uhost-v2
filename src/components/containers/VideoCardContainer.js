import Enumerable from "linq";
import VideoCard from "../cards/VideoCard";

export default function VideoCardContainer({ collection }) {
    if (collection) {
        return (
            <div className="card-wrapper flex-wrap">
                {Enumerable
                    .from(collection)
                    .select(e => <VideoCard key={e.getAlias()} video={e} />)
                }
            </div>
        );
    }
}