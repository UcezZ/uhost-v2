import { useContext } from 'react';
import StateContext from '../../../context/StateContext';
import UserEditorDialog from './../dialogs/UserEditorDialog';
import LocaleService from '../../../services/LocaleService';

export default function CardUser({ entity }) {
    const { user, locale } = useContext(StateContext);

    function changePasswordButton() {
        if (user.getId() === entity.getId()) {
            return (
                <div className="card-footer">
                    <button>{locale.getValue('user.changepassword')}</button>
                </div>
            );
        }

        /*<?php
        if (user.getId() == $currentuser->getId()) {
            print('
        <div className="card-footer">
            <a href="./password.php">' . locale.getValue('user.changepassword') . '</a>
        </div>');
        }
       }*/
    }

    function editProfileButton() {
        if (entity.isAdmin() || entity.getId() === user.getId()) {
            return (
                <UserEditorDialog entity={entity} />
            );
        }
        /*<?php
            if (isset($currentuser) && ($currentuser->isAdmin() || user.getId() == $currentuser->getId()))
                require __DIR__ . '/form-editor-user.php';
           } */
    }

    return (
        <div className="card profile">
            <div className="card-header">{entity.getName()}</div>
            {editProfileButton()}
            <table className="card-contents">
                <tbody>
                    <tr>
                        <td>{locale.getValue('common.id.full')}</td>
                        <td>{entity.getId()}</td>
                    </tr>
                    <tr>
                        <td>{locale.getValue('auth.login')}</td>
                        <td>{entity.getLogin()}</td>
                    </tr>
                    <tr>
                        <td>{locale.getValue('user.role')}</td>
                        <td>{entity.getRole()}</td>
                    </tr>
                    <tr>
                        <td>{locale.getValue('user.info')}</td>
                        <td>{entity.getInfo() && entity.getInfo().length ? entity.getInfo() : locale.getValue('user.info.empty')}</td>
                    </tr>
                    <tr>
                        <td>{locale.getValue('user.locale')}</td>
                        <td>{LocaleService.getSupportedLocales()[locale.gatherLocale(entity.getLocale())] ?? entity.getLocale()}</td>
                    </tr>
                    <tr>
                        <td>{locale.getValue('user.theme')}</td>
                        {/* <td>{Theme::getSupportedThemes()[Theme::gatherTheme(user.getTheme())]}</td> */}
                    </tr>
                    <tr>
                        <td>
                            {/* <a href="./video.php{user.getId() == $currentuser->getId() ? '' : '?u=' . user.getId()}"> {locale.getValue(entity.getId() == $currentuser -> getId() ? 'link.myvideos' : 'link.uservideos')} </a> */}
                        </td>
                        {/* <td>{Video::count($user)}</td> */}
                    </tr>
                    <tr>
                        <td>
                            {/* <a href="./playlist.php{user.getId() == $currentuser->getId() ? '' : '?u=' . user.getId()}">{locale.getValue(entity.getId() == $currentuser -> getId() ? 'link.myplaylists' : 'link.userplaylists')}</a> */}
                        </td>
                        {/* <td>{Playlist::count($user)}</td> */}
                    </tr></tbody>
            </table>
            {changePasswordButton()}
        </div>
    );
}