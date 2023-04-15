import { useContext, useEffect, useState } from 'react';
import StateContext from '../../../context/StateContext';
import { Link, useNavigate } from 'react-router-dom';
import DownloadIcon from './../../../img/download.svg';
import PlaylistIcon from './../../../img/playlist.svg';
import EditIcon from './../../../img/edit.svg';
import DeleteIcon from './../../../img/delete.svg';
import AddVideoToPlaylistDialog from '../dialogs/AddVideoToPlaylistDialog';
import EditVideoDialog from '../dialogs/EditVideoDialog';
import Video from '../../../entities/Video';
import YesNoDialog from '../dialogs/YesNoDialog';
import ApiService from '../../../services/ApiService';
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
                navigate('./');
            },
            e => setModal(<ErrorDialog error={e} />));
    }

    function buttons() {
        if (user) {
            let buttons = [];

            buttons.push(
                <div className="action-wrapper">
                    <button className="addtopls" onClick={e => setModal(<AddVideoToPlaylistDialog onClose={e => setModal()} video={video} />)}>
                        <img src={PlaylistIcon} />
                        <span>{locale.getValue('playlist.addto')}</span>
                    </button>
                </div >
            );

            if (user.isAdmin() || user.getId() === video.getUserId()) {
                buttons.push(
                    <div className="action-wrapper">
                        <button className="edit" onClick={e => setModal(<EditVideoDialog onClose={successEdit} video={video} />)}>
                            <img src={EditIcon} />
                            <span>{locale.getValue('common.edit')}</span>
                        </button>
                    </div>
                );

                buttons.push(
                    <div className="action-wrapper">
                        <button className="delete" onClick={e => setModal(<YesNoDialog caption={locale.getValue('delete.confirm')} message={locale.getValue('video.delete.question')} onSubmit={deleteVideo} onClose={e => setModal()} />)}>
                            <img src={DeleteIcon} />
                            <span>{locale.getValue('common.delete')}</span>
                        </button>
                    </div>
                );
            }

            return buttons;
        }
    }
    console.log(modal);
    return (
        <div key={video.getAlias()} className="player-wrapper content-wrapper">
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
                        <a className="download" href={video.getDownloadUrl(token)}>
                            <img src={DownloadIcon} />
                            <span>{locale.getValue('common.download')}</span>
                        </a>
                    </div>
                    {buttons()}
                </div>
            </div>
            {modal}
        </div>
    );
}