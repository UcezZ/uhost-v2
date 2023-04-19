import { useContext } from "react";
import StateContext from "../../../context/StateContext";

export default function VideoCard({ onClose }) {
    const { token, locale } = useContext(StateContext);
    function submit(e) {
        e.preventDefault && e.preventDefault();

    }

    return (
        <div className="card">
            <div className="card-header">{locale.getValue('page.createpls')}
                <button onClick={onClose} className="floating-modal-caller close">
                    <span></span>
                    <span></span>
                </button>
            </div>
            <form onSubmit={submit}>
                <table className="card-body">
                    <tbody>
                        <tr>
                            <td>{locale.getValue('common.caption')}</td>
                            <td><input id="name" type="text" name="name" required minLength="2" maxLength="255" /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="submit-wrapper">
                    <button type="submit">{locale.getValue('common.create')}</button>
                </div>
            </form>
        </div>
    );
}