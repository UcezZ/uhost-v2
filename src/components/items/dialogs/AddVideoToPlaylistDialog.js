import { useState, useContext } from 'react';
import StateContext from '../../../context/StateContext';
import ReactModal from 'react-modal';
import Common from '../../../Common';
import ApiService from '../../../services/ApiService';
import Enumerable from 'linq';
import SuccessDialog from './SuccessDialog';
import ErrorDialog from './ErrorDialog';

export default function AddVideoToPlaylistDialog({ onClose, video }) {
    const { token, locale } = useContext(StateContext);
    const [modalVisible, setModalVisible] = useState(true);
    const [options, setOptions] = useState();
    const [overlayDialog, setOverlayDialog] = useState();
    const [view, setView] = useState();

    if (!options) {
        ApiService.getPlaylists(
            token,
            0,
            e => setOptions(
                Enumerable
                    .from(e)
                    .select(p => <option value={p.getId()}>{p.getName()}</option>)
            ),
            console.log
        );
    }

    function onSuccess(e) {
        setView(
            <SuccessDialog message={e.message} caption={e.caption} onSubmit={onClose} />
        );
    }

    function onError(e) {
        setOverlayDialog(
            <ErrorDialog error={e} onSubmit={e => setOverlayDialog()} />
        );
    }

    function submit(e) {
        e.preventDefault && e.preventDefault();

        ApiService.addVideoToPlaylist(token, e.target, onSuccess, onError);
    }

    function close(e) {
        setModalVisible(false);
        onClose && onClose();
    }

    return view ?? (
        <div className="modal-wrapper">
            <ReactModal className="card-wrapper" isOpen={modalVisible} style={Common.getModalInlineStyles()} ariaHideApp={false}>
                <div className="card">
                    <div className="card-header">{locale.getValue('page.addtopls')}
                        <button onClick={close} className="floating-modal-caller close">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <form onSubmit={submit}>
                        <input type="hidden" name="v" value={video.getAlias()} />
                        <table className="card-body">
                            <tbody>
                                <tr>
                                    <td>{locale.getValue('playlist.playlist')}</td>
                                    <td>
                                        <select name="p" required>
                                            <option value="" selected><i>{locale.getValue('playlist.choose')}</i></option>
                                            {options}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="card-footer">
                            <button type="submit">{locale.getValue('playlist.addto')}</button>
                        </div>
                    </form>
                    {overlayDialog}
                </div>
            </ReactModal>
        </div>
    );
}