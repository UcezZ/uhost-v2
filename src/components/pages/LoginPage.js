import './../../fonts/productsans.css';
import './../../css/styles.css';
import './../../css/card.css';
import './../../css/form.css';
import './../../css/card-state.css';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import StateContext from './../../context/StateContext';
import ApiService from './../../services/ApiService';
import CommonMethods from '../../CommonMethods';

export default function LoginPage() {
    const { locale, setToken } = useContext(StateContext);
    const navigate = useNavigate();

    function success(e) {
        setToken(e);
        navigate('/');
    }

    function login(eventData) {
        ApiService.login(eventData.target,
            success,
            CommonMethods.errorHandler);
    }

    return (
        <div>
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-header">{locale.getValue('login.title')}</div>
                    <form className="hscroll" onSubmit={login} action="javascript:void(0);" >
                        <table className="card-contents">
                            <tbody>
                                <tr>
                                    <td>{locale.getValue('auth.login')}</td>
                                    <td><input name="login" required /></td>
                                </tr>
                                <tr>
                                    <td>{locale.getValue('auth.password')}</td>
                                    <td><input type="password" name="password" required /></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="submit-wrapper">
                            <button>{locale.getValue('login.submit')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}