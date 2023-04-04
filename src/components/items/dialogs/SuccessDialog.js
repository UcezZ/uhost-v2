import ReactModal from 'react-modal';
import Common from '../../../Common';
import { useContext, useState } from 'react';
import './../../../css/card-state.css';
import StateContext from '../../../context/StateContext';
import SuccessCard from '../cards/SuccessCard';

/**
 * Success dialog
 */
export default function SuccessDialog({ caption, message, onSubmit }) {
    const [modalVisible, setModalVisible] = useState(true);
    const { locale } = useContext(StateContext);

    function close(e) {
        setModalVisible(false);
        onSubmit && onSubmit();
    }

    return (
        <ReactModal className="card-wrapper" isOpen={modalVisible} style={Common.getModalInlineStyles()} ariaHideApp={false}>
            <SuccessCard message={message} caption={caption} onSubmit={close} submitCaption={locale.getValue('common.close')} />
        </ReactModal>
    );
}