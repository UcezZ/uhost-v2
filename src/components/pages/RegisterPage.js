import './../../fonts/productsans.css';
import './../../css/styles.css';
import './../../css/card.css';
import './../../css/form.css';
import './../../css/card-state.css';
import React, { useContext } from 'react';
import StateContext from '../../context/StateContext';
import Header from '../items/Header';

export default function RegisterPage() {
    const { locale, setLocale } = useContext(StateContext);

    return (
        <div>
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-header">{locale.getValue('page.register')}</div>
                    <form className="hscroll" method="POST" enctype="utf8">
                        <table className="card-contents">
                            <tr>
                                <td>{locale.getValue('user.name')}</td>
                                <td><input name="name" minlength="2" maxlength="64" value="<?= $_POST['name'] ?? ''}" required /></td>
                            </tr>
                            <tr>
                                <td>{locale.getValue('auth.login')}</td>
                                <td><input name="login" minlength="5" maxlength="64" value="<?= $_POST['login'] ?? ''}" required /></td>
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
        </div>
    )
}