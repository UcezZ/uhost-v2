import '../../css/playlist.css';

import StateContext from "../../context/StateContext";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import EmptyIcon from '../../img/video-empty.svg';
import DeleteIcon from '../../img/delete.svg';
import EditIcon from '../../img/edit.svg';
import YesNoDialog from "../dialogs/YesNoDialog";
import Enumerable from "linq";
import ErrorCard from "./ErrorCard";
import PlaylistEntryItem from '../items/PlaylistEntryItem';
import EditPlaylistDialog from '../dialogs/EditPlaylistDialog';
import ApiService from '../../services/ApiService';

export default function PlaylistCard({ playlist }) {
    const { token, locale } = useContext(StateContext);
    const [modal, setModal] = useState();
    const [rem, setRem] = useState(false);
    const previewSrc = playlist.hasVideos() ? playlist.getVideos()[0].getThumbUrl(token) : EmptyIcon;
    const previewClass = playlist.hasVideos() ? '' : 'empty';
    const previewList = playlist.hasVideos() ?
        Enumerable
            .from(playlist.getVideos())
            .select(e => <PlaylistEntryItem video={e} playlistId={playlist.getId()} />) :
        (
            <div className="card-wrapper">
                <ErrorCard caption={locale.getValue('playlist.error.empty')} message={locale.getValue('playlist.error.empty.message')} />
            </div>
        );
    const buttonPlay = playlist.hasVideos() ? <Link to={`/video?v=${playlist.getVideos()[0].getAlias()}&p=${playlist.getId()}`}>{locale.getValue('playlist.play')}</Link> : null;

    function removePlaylist(e) {
        ApiService.removePlaylist(
            token,
            playlist.getId(),
            e => setRem(true),
            e => setModal(<ErrorCard error={e} onSubmit={ev => setModal()} />)
        );
    }

    if (rem) {
        return null;
    }

    return (
        <div id={`playlist_${playlist.getId()}`} className="playlist-item card">
            <div className="card-header">
                {playlist.getName()}
                <div className="buttons">
                    <div className="button-wrapper">
                        <button onClick={e => setModal(<EditPlaylistDialog onClose={d => setModal()} playlist={playlist} />)}>
                            <img src={EditIcon} alt="Edit" />
                            <span>{locale.getValue('common.edit')}</span>
                        </button>
                    </div>
                    <div className="button-wrapper">
                        <button onClick={e => setModal(<YesNoDialog caption={locale.getValue('log.event.playlistdelete')} message={locale.getValue('playlist.remove.question')} onSubmit={removePlaylist} onClose={e => setModal()} />)}>
                            <img src={DeleteIcon} alt="Delete" />
                            <span>{locale.getValue('common.delete')}</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="preview">
                    <img className={previewClass} src={previewSrc} alt="Preview" />
                    <span>{locale.getValue('playlist.elements')}: {playlist.getVideos().length}</span>
                </div>
                <div className="contents">
                    {previewList}
                </div>
            </div>
            <div className="card-footer">
                {buttonPlay}
            </div>
            {modal}
        </div>
    );
}