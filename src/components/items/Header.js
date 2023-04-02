import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Common from '../../Common';
import StateContext from '../../context/StateContext';
import User from '../../entities/User';
import ApiService from '../../services/ApiService';

export default function Header() {
    const { locale, token, user, setToken } = useContext(StateContext);
    const location = useLocation();

    useEffect(() => { }, [user, location]);

    function logout(e) {
        ApiService.logout(token);
        setToken();
    }

    function isPageNavigated(name) {
        return window.location.pathname.toLowerCase().endsWith(name.toLowerCase());
    }

    function headerNavSelected(name) {
        if (isPageNavigated(name)) {
            return 'selected';
        }
    }

    function headerUserIcon() {
        if (user) {
            return (
                <Link to='/profile' className="profile flex">
                    <div className="profile-icon centerer-wrapper" />
                    <div className="centerer-wrapper">
                        <span className="profile">
                            {user.name}
                        </span>
                    </div>
                </Link>
            );
        }
    }

    function headerAuthButton(url, caption) {
        return (
            <div className="centerer-wrapper">
                <Link to={url}>{caption}</Link>
            </div>
        );
    }

    function authButtons() {
        let buttons = [];

        if (user) {
            buttons.push(
                <div className="centerer-wrapper">
                    <Link to='/' onClick={logout}>{locale.getValue('page.logout')}</Link>
                </div>
            );
        } else {
            if (!isPageNavigated('login')) {
                buttons.push(headerAuthButton('/login', locale.getValue('page.login')));
            }
            if (!isPageNavigated('register')) {
                buttons.push(headerAuthButton('/register', locale.getValue('page.register')));
            }
        }

        return (
            <div className="auth-buttons">
                {buttons}
            </div>
        );
    }

    return (
        <div className="header">
            {user ? <input id="burger-toggle" type="checkbox" /> : null}
            {user ?
                <label htmlFor="burger-toggle" className="burger-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                : null}
            <div className="logo-caption centerer-wrapper">
                <span>
                    <Link to='/'>uHost</Link>
                </span>
            </div>
            {user ?
                <div className="menu-wrapper">
                    <div className="menu">
                        <Link to='/' className={headerNavSelected('/')}>{locale.getValue('page.main')} </Link>
                        <Link to='/profile' className={headerNavSelected('profile')}> {locale.getValue('page.profile')}</Link>
                        <Link to='/video' className={headerNavSelected('video')} >{locale.getValue('page.video')}</Link>
                        <Link to='/playlist' className={headerNavSelected('playlist')} >{locale.getValue('page.playlists')}</Link>
                        {user && user.isAdmin() ? <Link to='/admin' className={headerNavSelected('admin')} >{locale.getValue('page.admin')}</Link> : null}
                    </div>
                </div>
                : null}
            <div className="auth-block">
                {headerUserIcon()}
                {authButtons()}
            </div>
        </div>
    );
}
