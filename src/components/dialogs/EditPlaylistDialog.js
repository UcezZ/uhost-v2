import { useState, useContext } from 'react';
import StateContext from '../../context/StateContext';
import ReactModal from 'react-modal';
import Common from '../../Common';
import ApiService from '../../services/ApiService';
import ErrorDialog from './ErrorDialog';
import Playlist from '../../entities/Playlist';

export default function EditPlaylistDialog({ onClose, playlist }) {
    const { token, locale } = useContext(StateContext);
    const [modalVisible, setModalVisible] = useState(true);
    const [modal, setModal] = useState();

    function onError(e) {
        setModal(
            <ErrorDialog error={e} onSubmit={e => setModal()} />
        );
    }

    function onSuccess(e) {
        if (e instanceof Playlist) {
            playlist.fillFrom(e);
        }
        setModalVisible(false);
        onClose && onClose();
    }

    function submit(e) {
        e.preventDefault && e.preventDefault();
        ApiService.editPlaylist(token, e.target, onSuccess, onError);
    }

    if (!modalVisible) {
        return null;
    }

    return (
        <div className="modal-wrapper">
            <ReactModal className="card-wrapper" isOpen={modalVisible} style={Common.getModalInlineStyles()} ariaHideApp={false}>
                <div className="card">
                    <div className="card-header">{locale.getValue('playlist.edit')}
                        <button onClick={onSuccess} className="floating-modal-caller close">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <form onSubmit={submit}>
                        <input type="hidden" name="p" value={playlist.getId()} />
                        <table className="card-body">
                            <tbody>
                                <tr>
                                    <td>{locale.getValue('common.caption')}</td>
                                    <td>
                                        <input type="text" name="name" maxLength="255" defaultValue={playlist.getName()} required />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="card-footer">
                            <button type="submit">{locale.getValue('common.apply')}</button>
                        </div>
                    </form>
                    {modal}
                </div>
            </ReactModal>
        </div>
    );
}