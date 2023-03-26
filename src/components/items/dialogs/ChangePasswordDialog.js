import { useState, useContext } from 'react';
import StateContext from '../../../context/StateContext';
import editIcon from './../../../img/edit.svg';
import ReactModal from 'react-modal';
import CommonMethods from '../../../CommonMethods';
import LocaleService from '../../../services/LocaleService';
import ThemeService from '../../../services/ThemeService';
import User from '../../../entities/User';

export default function ChangePasswordDialog({ entity }) {
    const { locale } = useContext(StateContext);
    const [modalVisible, setModalVisible] = useState(false);

    function localeOptions() {
        let options = [];
        let locales = LocaleService.getSupportedLocales();

        for (let key in locales) {
            let option = <option value={key} selected={entity.getLocale() === key}>{locales[key]}</option>;
            options.push(option);
        }

        return options;
    }

    function themeOptions() {
        let options = [];
        let locales = ThemeService.getSupportedThemes();

        for (let key in locales) {
            let option = <option value={key} selected={entity.getTheme() === key}>{locales[key]}</option>;
            options.push(option);
        }

        return options;
    }

    return (
        <div className="modal-wrapper">
            <button onClick={e => setModalVisible(true)} className="floating-modal-caller user-editor glow">
                <img src={editIcon} />
            </button>
            <ReactModal className="card-wrapper" isOpen={modalVisible} style={CommonMethods.getModalInlineStyles()} ariaHideApp={false}>
                <div className="card">
                    <div className="card-header">{locale.getValue('user.edit')}
                        <button onClick={e => setModalVisible(false)} className="floating-modal-caller close">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <form className="hscroll" onSubmit={User.edit} action="javascript:void(0);">
                        <input type="hidden" name="id" value={entity.getId()} />
                        <input style={{ display: 'none' }} type="checkbox" changeConfirmator required />
                        <table className="card-contents">
                            <tbody>
                                <tr>
                                    <td>{locale.getValue('user.locale')}</td>
                                    <td>
                                        <select onChange={CommonMethods.formChangeTrigger} name="locale">
                                            {localeOptions()}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{locale.getValue('user.theme')}</td>
                                    <td>
                                        <select onChange={CommonMethods.formChangeTrigger} name="theme">
                                            {themeOptions()}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{locale.getValue('user.name')}</td>
                                    <td>
                                        <input type="text" name="name" onChange={CommonMethods.formChangeTrigger} value={entity.getName()} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>{locale.getValue('user.info')}</td>
                                    <td>
                                        <textarea name="info" onChange={CommonMethods.formChangeTrigger}>{entity.getInfo()}</textarea>
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