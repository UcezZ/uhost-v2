export default function BigRedButt({ caption, subStyle, onClick }) {
    if (!caption) {
        caption = '';
    }
    if (!subStyle) {
        subStyle = '';
    }

    return (
        <div className="centerer-wrapper row">
            <div className="centerer-wrapper">
                <div className={`big-red-button ${subStyle}`} onClick={onClick}><span>{caption}</span></div>
            </div>
        </div>
    );
}