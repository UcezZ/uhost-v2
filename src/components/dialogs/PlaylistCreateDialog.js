import { useContext, useState } from "react";
import StateContext from "../../context/StateContext";
import ApiService from '../../services/ApiService';
import ErrorDialog from "./ErrorDialog";
import ReactModal from 'react-modal';
import Common from "../../Common";

export default function PlaylistCreateDialog({ onClose }) {
    const { token, locale } = useContext(StateContext);
    const [modalVisible, setModalVisible] = useState(true);
    const [modal, setModal] = useState();

    function close(e) {
        setModalVisible(false);
        onClose && onClose(e);
    }

    function submit(e) {
        e.preventDefault && e.preventDefault();

        ApiService.addPlaylist(
            token,
            e.target,
            close,
            ev => setModal(<ErrorDialog error={ev} onSubmit={s => setModal()} />)
        );
    }

    return (
        <ReactModal className="card-wrapper" isOpen={modalVisible} style={Common.getModalInlineStyles()} ariaHideApp={false}>
            <div className="card">
                <div className="card-header">{locale.getValue('page.createpls')}
                    <button onClick={onClose} className="floating-modal-caller close">
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <form onSubmit={submit}>
                    <table className="card-body">
                        <tbody>
                            <tr>
                                <td>{locale.getValue('common.caption')}</td>
                                <td><input id="name" type="text" name="name" required minLength="2" maxLength="255" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="submit-wrapper">
                        <button type="submit">{locale.getValue('common.create')}</button>
                    </div>
                </form>
            </div>
            {modal}
        </ReactModal>
    );
}