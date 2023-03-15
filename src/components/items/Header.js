import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StateContext from '../../context/StateContext';

export default function Header() {
    const { user, locale, setToken } = useContext(StateContext);
    const location = useLocation();
    useEffect(() => { }, [user, location]);

    function headerBurgerToggle() {
        if (user) {
            return (
                <input id="burger-toggle" type="checkbox" />
            )
        };
    }

    function headerBurger() {
        if (user) {
            return (
                <label htmlFor="burger-toggle" className="burger-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            )
        };
    }

    function isPageNavigated(name) {
        // if (Array.isArray(name)) {
        //     for (let index in name) {
        //         if (window.location.pathname.toLowerCase().endsWith(name[index].toLowerCase())) {
        //             return true;
        //         }
        //     }
        //     return false;
        // }
        return window.location.pathname.toLowerCase().endsWith(name.toLowerCase());
    }

    function headerNavSelected(name) {
        if (isPageNavigated(name)) {
            return 'selected';
        }
    }

    function headerMenuWrapper() {
        if (user) {
            return (
                <div className="menu-wrapper">
                    <div className="menu">
                        <Link to='/' className={headerNavSelected('/')}>{locale.getValue('page.main')} </Link>
                        <Link to='/profile' className={headerNavSelected('profile')}> {locale.getValue('page.profile')}</Link>
                        <Link to='/video' className={headerNavSelected('video')} >{locale.getValue('page.video')}</Link>
                        <Link to='/playlist' className={headerNavSelected('playlist')} >{locale.getValue('page.playlists')}</Link>
                    </div>
                </div>
            )
        };
    }

    function headerUserIcon() {
        if (user) {
            return (
                <Link to='/profile' className="profile flex">
                    <div className="profile-icon centerer-wrapper"></div>
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
                    <Link to='/' onClick={e => setToken(null)}>{locale.getValue('page.logout')}</Link>
                </div>);
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
            </div>);
    }

    return (
        <div className="header">
            {headerBurgerToggle()}
            {headerBurger()}
            <div className="logo-caption centerer-wrapper">
                <span>
                    <Link to='/'>uHost</Link>
                </span>
            </div>
            {headerMenuWrapper()}
            <div className="auth-block">
                {headerUserIcon()}
                {authButtons()}
            </div>
        </div>
    );
}
