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
import PlaylistPage from './components/pages/PlaylistPage';

export default function App() {
    const cookies = new Cookies();
    const [token, setToken] = useState(cookies.get(Common.getTokenCookieKey()));
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

    let userLoaded = false;

    // всё по токену
    useEffect(
        () => {
            if (token) {
                if (!userLoaded) {
                    userLoaded = true;
                    ApiService.authenticate(token, onAuthSuccess, onAuthFail);
                }
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

    if (locale && theme) {
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
                        <Route path='login' element={<LoginPage />} />
                        <Route path='register' element={<RegisterPage />} />
                        <Route path='video' element={<VideoPage />} />
                        <Route path='profile' element={<ProfilePage />} />
                        <Route path='playlist' element={<PlaylistPage />} />
                    </Routes>
                </BrowserRouter>
            </StateContext.Provider>
        );
    }
}
