import { useState, useContext } from 'react';
import StateContext from '../../../context/StateContext';
import editIcon from './../../../img/edit.svg';
import ReactModal from 'react-modal';
import Common from '../../../Common';
import LocaleService from '../../../services/LocaleService';
import ThemeService from '../../../services/ThemeService';
import ApiService from '../../../services/ApiService';
import Enumerable from 'linq';
import User from '../../../entities/User';

export default function UserEditorDialog({ entity, refresh }) {
    const { token, locale, user, setUser } = useContext(StateContext);
    const [modalVisible, setModalVisible] = useState(false);

    function edit(e) {
        ApiService.editUser(token, e.target, responseHandler, responseHandler);
    }

    function responseHandler(e) {
        if (e.success && e.success === true) {
            setModalVisible(false);
            let edited = new User(e.result);
            if (edited.id === user.id) {
                setUser(edited);
            }
        } else {
            console.log(JSON.stringify(e.success !== undefined && e.success === false ? e.result : e));
        }
    }

    return (
        <div className="modal-wrapper">
            <button onClick={e => setModalVisible(true)} className="floating-modal-caller user-editor glow">
                <img src={editIcon} alt='Edit' />
            </button>
            <ReactModal className="card-wrapper" isOpen={modalVisible} style={Common.getModalInlineStyles()} ariaHideApp={false}>
                <div className="card">
                    <div className="card-header">{locale.getValue('user.edit')}
                        <button onClick={e => setModalVisible(false)} className="floating-modal-caller close">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <form className="hscroll" onSubmit={edit} action="javascript:void(0);">
                        <input type="hidden" name="id" value={entity.getId()} />
                        <input style={{ display: 'none' }} type="checkbox" required />
                        <table className="card-contents">
                            <tbody>
                                <tr>
                                    <td>{locale.getValue('user.locale')}</td>
                                    <td>
                                        <select onChange={Common.formChangeTrigger} name="locale" defaultValue={entity.getLocale()}>
                                            {
                                                Enumerable
                                                    .from(LocaleService.getSupportedLocales())
                                                    .select(e => <option value={e.key}>{e.value}</option>)
                                            }
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{locale.getValue('user.theme')}</td>
                                    <td>
                                        <select onChange={Common.formChangeTrigger} name="theme" defaultValue={entity.getTheme()}>
                                            {
                                                Enumerable
                                                    .from(ThemeService.getSupportedThemes())
                                                    .select(e => <option value={e}>{locale.getValue(`theme.${e}`)}</option>)
                                            }
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{locale.getValue('user.name')}</td>
                                    <td>
                                        <input type="text" name="name" onChange={Common.formChangeTrigger} defaultValue={entity.getName()} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>{locale.getValue('user.info')}</td>
                                    <td>
                                        <textarea name="info" onChange={Common.formChangeTrigger} defaultValue={entity.getInfo()} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="submit-wrapper">
                            <button>{locale.getValue('common.apply')}</button>
                        </div>
                    </form>
                </div>
            </ReactModal>
        </div>
    );
}