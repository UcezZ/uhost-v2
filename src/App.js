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

export default function App() {
    const cookies = new Cookies();
    const [token, setToken] = useState(cookies.get('token') ?? null);
    const [user, setUser] = useState(new User());
    const [locale, setLocale] = useState(new LocaleService());
    const [theme, setTheme] = useState(new ThemeService());

    // кука по токену
    useEffect(
        () => {
            console.log(token);
            if (token) {
                cookies.set('token', token, {
                    expires: new Date(Date.now().valueOf() + 3600000)
                });
            } else {
                cookies.remove('token');
                setUser(null);
            }
        },
        [token]);

    // пользователь по токену
    useEffect(() => ApiService.authenticate(token, setUser, e => {
        cookies.remove('token');
        setUser(null);
    }), [token]);

    // локаль по пользователю
    useEffect(() => {
        setLocale(new LocaleService(user));
    }, [user]);

    // тема по пользователю
    useEffect(() => {
        setTheme(new ThemeService(user));
    }, [user]);

    // применение темы
    useEffect(() => {
        theme.importStyleSheet();
    }, [theme]);

    return (
        <StateContext.Provider value={{
            user: user, setUser: setUser,
            token: token, setToken: setToken,
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
                </Routes>
            </BrowserRouter>
        </StateContext.Provider>
    );
}
