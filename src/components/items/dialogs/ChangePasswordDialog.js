import { useState, useContext } from 'react';
import StateContext from '../../../context/StateContext';
import ReactModal from 'react-modal';
import Common from '../../../Common';
import User from '../../../entities/User';

export default function ChangePasswordDialog({ entity }) {
    const { locale } = useContext(StateContext);
    const [modalVisible, setModalVisible] = useState(false);

    function changePassword(e) {
        e.preventDefault && e.preventDefault();

        console.log(e);
    }

    return (
        <div className="modal-wrapper">
            <div className="card-footer">
                <button onClick={e => setModalVisible(true)}>{locale.getValue('page.password')}</button>
            </div>
            <ReactModal className="card-wrapper" isOpen={modalVisible} style={Common.getModalInlineStyles()} ariaHideApp={false}>
                <div className="card">
                    <div className="card-header">{locale.getValue('page.password')}
                        <button onClick={e => setModalVisible(false)} className="floating-modal-caller close">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <form onSubmit={changePassword}>
                        <table className="card-contents">
                            <tr>
                                <td>{locale.getValue('auth.login')}</td>
                                <td>{entity.getLogin()}</td>
                            </tr>
                            <tr>
                                <td>{locale.getValue('auth.oldpassword')}</td>
                                <td><input type="password" name="oldpassword" required /></td>
                            </tr>
                            <tr>
                                <td>{locale.getValue('auth.newpassword')}</td>
                                <td><input type="password" name="password" required /></td>
                            </tr>
                            <tr>
                                <td>{locale.getValue('auth.confirmnewpassword')}</td>
                                <td><input type="password" name="passwordConfirm" required /></td>
                            </tr>
                        </table>
                        <div className="submit-wrapper">
                            <button type="submit">{locale.getValue('user.changepassword')}</button>
                        </div>
                    </form>
                </div>
            </ReactModal>
        </div>
    );
}