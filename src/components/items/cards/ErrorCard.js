import { useContext } from "react";
import StateContext from "../../../context/StateContext";

export default function ErrorCard({ message, caption, onSubmit, submitCaption }) {
    const { locale } = useContext(StateContext);

    return (
        <div className="card">
            <div className="card-header">{caption ?? locale.getValue('common.error')}</div>
            <div className="card-contents">{message ?? locale.getValue('common.error')}</div>
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