import './../../../css/card-state.css';

import { useContext } from "react";
import StateContext from "../../../context/StateContext";

export default function ErrorCard({ error, message, caption, onSubmit, submitCaption }) {
    const { locale } = useContext(StateContext);

    if (!caption &&
        error &&
        error.response &&
        error.response.data &&
        error.response.data.result &&
        error.response.data.result.caption) {
        caption = error.response.data.result.caption;
    }

    if (!message &&
        error &&
        error.response &&
        error.response.data &&
        error.response.data.result &&
        error.response.data.result.message) {
        message = error.response.data.result.message;
    }

    if (!message && error && error.message) {
        message = error.message;
    }

    if (!message && error) {
        try {
            message = JSON.stringify();
        }
        catch (e) {
            message = locale.getValue('common.error');
        }
    }

    if (!caption) {
        caption = locale.getValue('common.error');
    }

    return (
        <div className="card error">
            <div className="card-header">{caption}</div>
            <div className="card-contents">{message}</div>
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