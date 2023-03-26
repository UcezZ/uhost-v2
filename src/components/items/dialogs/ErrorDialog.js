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
export default function ErrorDialog({ error, caption, message, onSubmit }) {
    const [modalVisible, setModalVisible] = useState(true);
    const { locale } = useContext(StateContext);

    console.log(error);

    if (!caption &&
        error &&
        error.response &&
        error.response.data &&
        error.response.data.result &&
        error.response.data.result.caption) {
        caption = error.response.data.result.caption;
    }

    if (!message &&
        error &&
        error.response &&
        error.response.data &&
        error.response.data.result &&
        error.response.data.result.message) {
        message = error.response.data.result.message;
    }

    if (!message && error && error.message) {
        message = error.message;
    }

    function close(e) {
        setModalVisible(false);
        onSubmit && onSubmit();
    }

    return (
        <ReactModal className="card-wrapper error" isOpen={modalVisible} style={Common.getModalInlineStyles()} ariaHideApp={false}>
            <ErrorCard message={message} caption={caption} onSubmit={close} submitCaption={locale.getValue('common.close')} />
        </ReactModal>
    );
}