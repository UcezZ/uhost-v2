import { useState, useContext } from 'react';
import StateContext from '../../../context/StateContext';
import editIcon from './../../../img/edit.svg';
import ReactModal from 'react-modal';
import CommonMethods from '../../../CommonMethods';
import LocaleService from '../../../services/LocaleService';

export default function UserEditorDialog({ entity }) {
    const { locale, theme } = useContext(StateContext);
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

    return (
        <div className="modal-wrapper">
            <button onClick={e => setModalVisible(true)} className="floating-modal-caller user-editor glow">
                <img src={editIcon} />
            </button>
            <ReactModal className="card-wrapper" isOpen={modalVisible} style={CommonMethods.getModalInlineStyles()}>
                <div className="card">
                    <div className="card-header">{locale.getValue('user.edit')}
                        <button onClick={e => setModalVisible(false)} className="floating-modal-caller close">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <form className="hscroll" action="javascript:void(0);">
                        <input type="hidden" name="u" value="{entity->getId()}" />
                        <input style={{ display: 'none' }} type="checkbox" id="uec{entity->getId()}" required />
                        <table className="card-contents">
                            <tbody>
                                <tr>
                                    <td>{locale.getValue('user.locale')}</td>
                                    <td>
                                        <select id="ul{entity->getId()}" name="locale">
                                            {
                                                localeOptions()
                                                /*foreach (locale.getSupportedLocales() as $localeKey => $localeName) {
                                                            print '<option value="' . $localeKey . '"' . (entity->getLocale() == $localeKey ? ' selected' : '') . '>' . $localeName . '</option>';
                                                }*/
                                            }
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{locale.getValue('user.theme')}</td>
                                    <td>
                                        <select id="ut{entity->getId()}" name="theme">
                                            {/*
                                    foreach (Theme::getSupportedThemes() as $themeKey => $themeName) {
                                                print '<option value="' . $themeKey . '"' . (entity->getTheme() == $themeKey ? ' selected' : '') . '>' . $themeName . '</option>';
                                    }*/
                                            }
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{locale.getValue('user.name')}</td>
                                    <td><input type="text" name="name" id="un{entity->getId()}" value="{entity->getName()}" /></td>
                                </tr>
                                <tr>
                                    <td>{locale.getValue('user.info')}</td>
                                    <td><textarea name="info" id="ui{entity->getId()}">{/*entity.getInfo()*/}</textarea></td>
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
    {/*<script id="ues{entity->getId()}">
        let
            c = document.getElementById('uec{entity->getId()}'),
            l = document.getElementById('ul{entity->getId()}'),
            t = document.getElementById('ut{entity->getId()}'),
            n = document.getElementById('un{entity->getId()}'),
            i = document.getElementById('ui{entity->getId()}'),
            s = document.getElementById('ues{entity->getId()}'),
            e = function() {
                if (!c.checked) {
                    c.checked = true;
                }
            };
        l.addEventListener('change', e);
        l.attributes.removeNamedItem('id');

        t.addEventListener('change', e);
        t.attributes.removeNamedItem('id');

        n.addEventListener('change', e);
        n.attributes.removeNamedItem('id');

        i.addEventListener('change', e);
        i.attributes.removeNamedItem('id');

        s.outerHTML = '';
        </script>*/}
}