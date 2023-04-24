import React, { useContext, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StateContext from '../../context/StateContext';
import ApiService from '../../services/ApiService';
import Enumerable from 'linq';

export default function Header() {
    const { locale, token, user, setToken } = useContext(StateContext);
    const location = useLocation();
    const burger = useRef();

    useEffect(() => { }, [user, location]);

    function closeMenu(e) {
        burger.current.checked = false;
    }

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
            {user ? <input id="burger-toggle" type="checkbox" ref={burger} /> : null}
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
                        {
                            Enumerable
                                .from(
                                    [
                                        { link: '/', caption: 'page.main' },
                                        { link: '/profile', caption: 'page.profile' },
                                        { link: '/video', caption: 'page.video' },
                                        { link: '/playlist', caption: 'page.playlists' },
                                        user && user.isAdmin() ? { link: '/admin', caption: 'page.admin' } : null
                                    ]
                                )
                                .where(e => e)
                                .select(
                                    e => <Link key={e.link} onMouseUp={closeMenu} onTouchEnd={closeMenu} to={e.link} className={headerNavSelected(e.link)}>{locale.getValue(e.caption)}</Link>
                                )
                        }
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
