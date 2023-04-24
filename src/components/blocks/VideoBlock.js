import { useContext, useState } from 'react';
import StateContext from '../../context/StateContext';
import { Link, useNavigate } from 'react-router-dom';
import DownloadIcon from './../../img/download.svg';
import PlaylistIcon from './../../img/playlist.svg';
import EditIcon from './../../img/edit.svg';
import DeleteIcon from './../../img/delete.svg';
import AddVideoToPlaylistDialog from '../dialogs/AddVideoToPlaylistDialog';
import EditVideoDialog from '../dialogs/EditVideoDialog';
import Video from '../../entities/Video';
import YesNoDialog from '../dialogs/YesNoDialog';
import ApiService from '../../services/ApiService';
import ErrorDialog from '../dialogs/ErrorDialog';

export default function VideoBlock({ video }) {
    const { token, user, locale } = useContext(StateContext);
    const [modal, setModal] = useState();
    const navigate = useNavigate();


    function successEdit(e) {
        if (e && e instanceof Video) {
            video.fillFrom(e);
        }
        setModal();
    }

    function deleteVideo(ev) {
        ApiService.deleteVideo(
            token,
            video.getAlias(),
            e => {
                navigate(-1);
            },
            e => setModal(<ErrorDialog error={e} />));
    }

    function buttons() {
        if (user) {
            let buttons = [];

            buttons.push(
                <div className="action-wrapper">
                    <button className="addtopls" onClick={e => setModal(<AddVideoToPlaylistDialog onClose={e => setModal()} video={video} />)}>
                        <img src={PlaylistIcon} alt="Playlist" />
                        <span>{locale.getValue('playlist.addto')}</span>
                    </button>
                </div >
            );

            if (user.isAdmin() || user.getId() === video.getUserId()) {
                buttons.push(
                    <div className="action-wrapper">
                        <button className="edit" onClick={e => setModal(<EditVideoDialog onClose={successEdit} video={video} />)}>
                            <img src={EditIcon} alt="Edit" />
                            <span>{locale.getValue('common.edit')}</span>
                        </button>
                    </div>
                );

                buttons.push(
                    <div className="action-wrapper">
                        <button className="delete" onClick={e => setModal(<YesNoDialog caption={locale.getValue('delete.confirm')} message={locale.getValue('video.delete.question')} onSubmit={deleteVideo} onClose={e => setModal()} />)}>
                            <img src={DeleteIcon} alt="Delete" />
                            <span>{locale.getValue('common.delete')}</span>
                        </button>
                    </div>
                );
            }

            return buttons;
        }
    }

    function saveVideoPosition(e) {
        if (e.target.currentTime) {
            localStorage.setItem(`video_pos_${video.getAlias()}`, Math.floor(e.target.currentTime));
        }
    }

    function removeVideoPosition(e) {
        localStorage.removeItem(`video_pos_${video.getAlias()}`);
    }

    function restoreVideo(e) {
        let volume = Number(localStorage.getItem('video_vol'));

        console.log(volume);
        if (e.target && volume && volume <= 1) {
            e.target.volume = volume;
        }

        let position = Number(localStorage.getItem(`video_pos_${video.getAlias()}`));

        if (e.target && position && position < video.getDuration()) {
            e.target.currentTime = position;
        }

        e.target.controls = true;
    }

    function saveVolume(e) {
        if (e.target.volume) {
            localStorage.setItem('video_vol', e.target.volume);
        }
    }

    return (
        <div key={video.getAlias()} className="player-wrapper content-wrapper">
            <div className="video-wrapper">
                <video onLoadedData={restoreVideo} onProgress={saveVideoPosition} onPlay={saveVideoPosition} onPause={saveVideoPosition} onSeeked={saveVideoPosition} onVolumeChange={saveVolume} poster={video.getThumbUrl(token)} onEnded={removeVideoPosition} controls>
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
                        <a className="download" href={video.getDownloadUrl(token)}>
                            <img src={DownloadIcon} alt="Download" />
                            <span>{locale.getValue('common.download')}</span>
                        </a>
                    </div>
                    {buttons()}
                </div>
            </div>
            {modal}
        </div >
    );
}