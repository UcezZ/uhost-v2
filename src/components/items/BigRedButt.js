import { Link } from "react-router-dom";

export default function BigRedButt({ to, caption, subStyle }) {
    to ??= '';
    caption ??= '';
    subStyle ??= '';

    return (
        <div className="centerer-wrapper row">
            <div className="centerer-wrapper">
                <Link className={`big-red-button ${subStyle}`} to={to}><span>{caption}</span></Link>
            </div>
        </div>
    );
}