import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Common from '../../Common';
import StateContext from '../../context/StateContext';
import User from '../../entities/User';
import ApiService from '../../services/ApiService';

export default function Header() {
    const { isLoggedIn, locale, token, setToken, user } = useContext(StateContext);
    const location = useLocation();

    useEffect(() => { }, [user, location]);

    function logout(e) {
        ApiService.logout(token);
        setToken(null);
    }

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
                        {user && user.isAdmin() ? <Link to='/admin' className={headerNavSelected('admin')} >{locale.getValue('page.admin')}</Link> : null}
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
