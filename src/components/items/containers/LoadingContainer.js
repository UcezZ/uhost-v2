import { useContext } from "react"
import StateContext from "../../../context/StateContext"

export default function LoadingContainer() {
    const { locale } = useContext(StateContext);

    return (
        <div className="centerer-wrapper row" style={{ minHeight: '50vh' }}>
            <div className="centerer-wrapper">
                <div className="loading-wrapper">
                    <span></span>
                    <span></span>
                    <span>{locale.getValue('common.loading')}</span>
                </div>
            </div>
        </div>
    );
}