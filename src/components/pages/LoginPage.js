import './../../css/card.css';
import './../../css/form.css';
import './../../css/card-state.css';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StateContext from './../../context/StateContext';
import ApiService from './../../services/ApiService';
import Common from '../../Common';
import ErrorDialog from '../items/dialogs/ErrorDialog';

export default function LoginPage() {
    const { locale, setToken } = useContext(StateContext);
    const [error, setError] = useState();
    const navigate = useNavigate();

    function success(e) {
        setToken(e.token);
        navigate(-1);
    }

    function login(e) {
        e.preventDefault && e.preventDefault();

        ApiService.login(e.target,
            success,
            setError);
    }

    return (
        <div>
            {error && <ErrorDialog error={error} onSubmit={e => setError()} />}
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-header">{locale.getValue('login.title')}</div>
                    <form className="hscroll" onSubmit={login}>
                        <table className="card-body">
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