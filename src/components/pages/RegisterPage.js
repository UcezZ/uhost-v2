import './../../css/card.css';
import './../../css/form.css';
import './../../css/card-state.css';
import React, { useContext, useState } from 'react';
import StateContext from '../../context/StateContext';
import ApiService from '../../services/ApiService';
import { useNavigate } from 'react-router-dom';
import SuccessDialog from '../dialogs/SuccessDialog';
import ErrorDialog from '../dialogs/ErrorDialog';

export default function RegisterPage() {
    const { locale } = useContext(StateContext);
    const [modal, setModal] = useState();
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault && e.preventDefault();

        ApiService.register(
            e.target,
            ev => setModal(<SuccessDialog caption={ev.caption} message={ev.message} onSubmit={s => navigate('/login')} />),
            ev => setModal(<ErrorDialog error={ev} onSubmit={s => setModal()} />)
        );
    }

    return (
        <div>
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-header">{locale.getValue('page.register')}</div>
                    <form className="hscroll" onSubmit={onSubmit} enctype="utf8">
                        <table className="card-body">
                            <tr>
                                <td>{locale.getValue('user.name')}</td>
                                <td><input name="name" minLength="2" maxLength="64" required /></td>
                            </tr>
                            <tr>
                                <td>{locale.getValue('auth.login')}</td>
                                <td><input name="login" minLength="5" maxLength="64" required /></td>
                            </tr>
                            <tr>
                                <td>{locale.getValue('auth.password')}</td>
                                <td><input type="password" name="password" required /></td>
                            </tr>
                            <tr>
                                <td>{locale.getValue('auth.confirmpassword')}</td>
                                <td><input type="password" name="passwordConfirm" required /></td>
                            </tr>
                        </table>
                        <div className="submit-wrapper">
                            <button type="submit">{locale.getValue('register.submit')}</button>
                        </div>
                    </form>
                </div>
            </div>
            {modal}
        </div>
    )
}