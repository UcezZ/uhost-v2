import { useState, useContext } from 'react';
import StateContext from '../../context/StateContext';
import ReactModal from 'react-modal';
import Common from '../../Common';
import ApiService from '../../services/ApiService';
import Enumerable from 'linq';
import ErrorDialog from './ErrorDialog';

export default function EditVideoDialog({ onClose, video }) {
    const { token, locale } = useContext(StateContext);
    const [modalVisible, setModalVisible] = useState(true);
    const [options, setOptions] = useState();
    const [overlayDialog, setOverlayDialog] = useState();

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

    function onError(e) {
        setOverlayDialog(
            <ErrorDialog error={e} onSubmit={e => setOverlayDialog()} />
        );
    }

    function close(e) {
        setModalVisible(false);
        e && video.fillFrom(e);
        onClose && onClose();
    }

    function submit(e) {
        e.preventDefault && e.preventDefault();
        ApiService.editVideo(token, e.target, close, onError);
    }

    return (
        <div className="modal-wrapper">
            <ReactModal className="card-wrapper" isOpen={modalVisible} style={Common.getModalInlineStyles()} ariaHideApp={false}>
                <div className="card">
                    <div className="card-header">{locale.getValue('video.edit')}
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
                                    <td>{locale.getValue('common.caption')}</td>
                                    <td>
                                        <input type="text" name="name" maxLength="255" defaultValue={video.getName()} required />
                                    </td>
                                </tr>
                                <tr>
                                    <td>{locale.getValue('video.ispublic')}</td>
                                    <td className="toggle-wrapper">
                                        <input id="vp" name="isPublic" type="checkbox" defaultChecked={video.getIsPublic()} />
                                        <label for="vp">
                                            <span></span>
                                        </label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="card-footer">
                            <button type="submit">{locale.getValue('common.apply')}</button>
                        </div>
                    </form>
                    {overlayDialog}
                </div>
            </ReactModal>
        </div>
    );
}