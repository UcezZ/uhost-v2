import ReactModal from 'react-modal';
import Common from '../../../Common';
import { useContext, useState } from 'react';
import './../../../css/card-state.css';
import StateContext from '../../../context/StateContext';
import ErrorCard from '../cards/ErrorCard';

/**
 * Error dialog
 * @param {{string, string, function(*)}} 
 */
export default function YesNoDialog({ caption, message, onSubmit, onReject, onClose }) {
    const [modalVisible, setModalVisible] = useState(true);
    const { locale } = useContext(StateContext);

    function close(e) {
        setModalVisible(false);
        onClose && onClose(e);
    }

    function submit(e) {
        close(e);
        onSubmit && onSubmit(e);
    }

    function reject(e) {
        close(e);
        onReject && onReject(e);
    }

    if (!caption) {
        caption = '';
    }

    if (!message) {
        message = '';
    }

    return (
        <ReactModal className="card-wrapper" isOpen={modalVisible} style={Common.getModalInlineStyles()} ariaHideApp={false}>
            <div className="card">
                <div className="card-header">
                    {caption}
                    <button onClick={close} className="floating-modal-caller close">
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="card-contents">{message}</div>
                <div className="card-footer">
                    <button onClick={submit}>{locale.getValue('common.yes')}</button>
                    <button onClick={reject}>{locale.getValue('common.no')}</button>
                </div>
            </div>
        </ReactModal>
    );
}