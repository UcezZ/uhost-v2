import './../../css/card-state.css';

import { useContext } from "react";
import StateContext from "../../context/StateContext";

export default function SuccessCard({ message, caption, onSubmit, submitCaption }) {
    const { locale } = useContext(StateContext);

    if (!caption) {
        caption = '';
    }

    if (!message) {
        message = '';
    }

    if (!submitCaption) {
        submitCaption = locale.getValue('common.close');
    }

    return (
        <div className="card success">
            <div className="card-header">{caption}</div>
            <div className="card-body">{message}</div>
            {
                onSubmit && submitCaption &&
                (
                    <div className="card-footer">
                        <button onClick={onSubmit}>{submitCaption}</button>
                    </div>
                )
            }
        </div>
    );
}