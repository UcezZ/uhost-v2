import '../../../css/playlist.css';

import StateContext from "../../../context/StateContext";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import EmptyIcon from '../../../img/video-empty.svg';
import DeleteIcon from '../../../img/delete.svg';
import EditIcon from '../../../img/edit.svg';
import YesNoDialog from "../dialogs/YesNoDialog";
import Enumerable from "linq";
import ErrorCard from "./ErrorCard";
import PlaylistEntryItem from '../PlaylistEntryItem';

export default function PlaylistCard({ playlist }) {
    const { token, locale } = useContext(StateContext);
    const { modal, setModal } = useState();
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
        console.log(`delete playlist ${JSON.stringify(playlist)}`);
    }


    return (
        <div className="playlist-item card">
            <div className="card-header">
                {playlist.getName()}
                <div className="buttons">
                    <div className="button-wrapper">
                        <button onClick={e => setModal()}>
                            <img src={EditIcon} />
                            <span>{locale.getValue('common.edit')}</span>
                        </button>
                    </div>
                    <div className="button-wrapper">
                        <button onClick={e => setModal(<YesNoDialog caption={locale.getValue('log.event.plsentryremove')} message={locale.getValue('playlist.entry.remove.question')} onSubmit={removePlaylist} onClose={e => setModal()} />)}>
                            <img src={DeleteIcon} />
                            <span>{locale.getValue('common.delete')}</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="preview">
                    <img className={previewClass} src={previewSrc} />
                    <span>{locale.getValue('playlist.elements')}: {playlist.getVideos().length}</span>
                </div>
                <div className="contents">
                    {previewList}
                </div>
            </div>
            <div className="card-footer">
                {buttonPlay}
            </div>
        </div>
    );
}