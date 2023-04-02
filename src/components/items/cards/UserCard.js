import { useState, useContext } from 'react';
import StateContext from '../../../context/StateContext';
import UserEditorDialog from './../dialogs/UserEditorDialog';
import LocaleService from '../../../services/LocaleService';
import { Link } from 'react-router-dom';
import ChangePasswordDialog from '../dialogs/ChangePasswordDialog';

export default function CardUser({ entity }) {
    const [shownUser, setShownUser] = useState(entity);
    const { locale, user } = useContext(StateContext);

    function changePasswordButton() {
        if (user.getId() === entity.getId()) {
            return <ChangePasswordDialog entity={entity} />;
        }
    }

    function editProfileButton() {
        if (entity.isAdmin() || entity.getId() === user.getId() || user.isAdmin()) {
            return (
                <UserEditorDialog entity={shownUser} setEntity={setShownUser} />
            );
        }
    }

    if (shownUser && user) {
        return (
            <div className="card profile">
                <div className="card-header">{shownUser.getName()}</div>
                {editProfileButton()}
                <table className="card-contents">
                    <tbody>
                        <tr>
                            <td>{locale.getValue('common.id.full')}</td>
                            <td>{shownUser.getId()}</td>
                        </tr>
                        <tr>
                            <td>{locale.getValue('auth.login')}</td>
                            <td>{shownUser.getLogin()}</td>
                        </tr>
                        <tr>
                            <td>{locale.getValue('user.role')}</td>
                            <td>{shownUser.getRole()}</td>
                        </tr>
                        <tr>
                            <td>{locale.getValue('user.info')}</td>
                            <td>{shownUser.getInfo() && shownUser.getInfo().length ? shownUser.getInfo() : <i>{locale.getValue('user.info.empty')}</i>}</td>
                        </tr>
                        <tr>
                            <td>{locale.getValue('user.locale')}</td>
                            <td>{LocaleService.getSupportedLocales()[locale.gatherLocale(shownUser.getLocale())] ?? shownUser.getLocale()}</td>
                        </tr>
                        <tr>
                            <td>{locale.getValue('user.theme')}</td>
                            <td>{locale.getValue(`theme.${shownUser.getTheme()}`)}</td>
                        </tr>
                        <tr>
                            <td>
                                <Link to={`/video${shownUser.getId() === user.getId() ? '' : '?u=' + shownUser.getId()}`}> {locale.getValue(shownUser.getId() === user.getId() ? 'link.myvideos' : 'link.uservideos')} </Link>
                            </td>
                            <td>{shownUser.getVideoCount()}</td>
                        </tr>
                        <tr>
                            <td>
                                <Link to={`/playlist${shownUser.getId() === user.getId() ? '' : '?u=' + shownUser.getId()}`}>{locale.getValue(shownUser.getId() === user.getId() ? 'link.myplaylists' : 'link.userplaylists')}</Link>
                            </td>
                            <td>{shownUser.getPlaylistCount()}</td>
                        </tr></tbody>
                </table>
                {changePasswordButton()}
            </div>
        );
    }
}