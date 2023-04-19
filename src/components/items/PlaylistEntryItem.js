import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import StateContext from "../../context/StateContext";
import ApiService from "../../services/ApiService";
import ErrorDialog from "./dialogs/ErrorDialog";
import YesNoDialog from "./dialogs/YesNoDialog";
import DeleteIcon from "./../../img/delete.svg";

export default function PlaylistEntryItem({ video, playlistId }) {
    const { token, locale } = useContext(StateContext);
    const [modal, setModal] = useState();
    const [deleted, setDeleted] = useState(false);

    if (deleted) {
        return null;
    }

    function removePlaylistEntry(e) {
        ApiService.removeVideoFromPlaylist
            (
                token,
                playlistId,
                video.getAlias(),
                e => setDeleted(true),
                e => setModal(<ErrorDialog error={e} onSubmit={ev => setModal()} />)
            );
    }

    return (
        <div className="playlist-entry">
            <div className="icon">
                <img src={video.getThumbUrl(token)} />
            </div>
            <Link to={`/video?v=${video.getAlias()}&p=${playlistId}`} className="name">
                <span>{video.getUser().name}</span>
                <span>{video.getName()}</span>
            </Link>
            <div className="duration">{video.getHumanDuration()}</div>
            <div className="button-wrapper">
                <button onClick={e => setModal(<YesNoDialog caption={locale.getValue('log.event.plsentryremove')} message={locale.getValue('playlist.entry.remove.question')} onSubmit={removePlaylistEntry} onClose={e => setModal()} />)}>
                    <img src={DeleteIcon} />
                    <span>{locale.getValue('common.delete')}</span>
                </button>
            </div>
            {modal}
        </div >
    );
}