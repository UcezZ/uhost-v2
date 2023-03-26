import './fonts/productsans.css';
import './css/styles.css';

import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';
import StateContext from './context/StateContext';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LocaleService from './services/LocaleService';
import RegisterPage from './components/pages/RegisterPage';
import VideoPage from './components/pages/VideoPage';
import Header from './components/items/Header';
import ProfilePage from './components/pages/ProfilePage';
import Cookies from 'universal-cookie';
import ApiService from './services/ApiService';
import ThemeService from './services/ThemeService';
import User from './entities/User';
import Common from './Common';
import Redirect from './components/Redirect';

export default function App() {
    const cookies = new Cookies();
    const [token, setToken] = useState(cookies.get(Common.getTokenCookieKey()) ?? null);
    const [user, setUser] = useState();
    const [locale, setLocale] = useState(new LocaleService(user));
    const [theme, setTheme] = useState(new ThemeService(user));

    function onAuthSuccess(e) {
        setUser(new User(e));
        cookies.set(Common.getTokenCookieKey(), token);
    }

    function onAuthFail(e) {
        cookies.remove(Common.getTokenCookieKey());
        setUser();
    }

    // всё по токену
    useEffect(
        () => {
            if (token) {
                ApiService.authenticate(token, onAuthSuccess, onAuthFail);
            } else {
                onAuthFail();
            }
        },
        [token]);

    //всё по юзеру
    useEffect(() => {
        setLocale(new LocaleService(user));
        setTheme(new ThemeService(user));
    }, [user]);

    return (
        <StateContext.Provider value={{
            token: token, setToken: setToken,
            user: user, setUser: setUser,
            locale: locale, setLocale: setLocale,
            theme: theme, setTheme: setTheme
        }}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='' element={<MainPage />} />
                    <Route path='login' element={token ? <Redirect /> : <LoginPage />} />
                    <Route path='register' element={token ? <Redirect /> : <RegisterPage />} />
                    <Route path='video' element={token ? <VideoPage /> : <Redirect />} />
                    <Route path='profile' element={token ? <ProfilePage /> : <Redirect />} />
                </Routes>
            </BrowserRouter>
        </StateContext.Provider>
    );
}
