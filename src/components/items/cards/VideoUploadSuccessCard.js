import { useContext } from "react";
import { Link } from "react-router-dom";
import StateContext from "../../../context/StateContext";

export default function VideoUploadSuccessCard({ video, onClose }) {
    const { token, locale } = useContext(StateContext);

    return (
        <div className="card-wrapper">
            <div className="card success">
                <div className="card-header">{locale.getValue('upload.success')}</div>
                <div className="card-contents">
                    <div className="video-preview">
                        <img className="video-preview" src={video.getThumbUrl(token)} />
                        <span>{video.getHumanDuration()}</span>
                    </div>
                </div>
                <div className="card-footer">
                    <button onClick={onClose}>{locale.getValue('common.back')}</button>
                    <Link to={`/video?v=${video.getAlias()}`} onClick={onClose}>{locale.getValue('video.play')}</Link>
                </div>
            </div>
        </div>
    );
}