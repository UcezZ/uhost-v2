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

    function close(e) {
        setModalVisible(false);
        onSubmit && onSubmit();
    }

    return (
        <ReactModal className="card-wrapper" isOpen={modalVisible} style={Common.getModalInlineStyles()} ariaHideApp={false}>
            <ErrorCard error={error} message={message} caption={caption} onSubmit={close} submitCaption={locale.getValue('common.close')} />
        </ReactModal>
    );
}