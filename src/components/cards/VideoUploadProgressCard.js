import { useContext } from 'react';
import StateContext from '../../context/StateContext';
import './../../css/loading-spinner.css';

export default function VideoUploadProgressCard({ progress }) {
    const { locale } = useContext(StateContext);
    console.log('жопа');

    return (
        <div className="card">
            <div className="card-header">{locale.getValue('page.upload')}</div>
            <div className="card-body centerer-wrapper" style={{ minHeight: '160px' }}>
                <div className="centerer-wrapper row">
                    <div className="loading-wrapper">
                        <span></span>
                        <span></span>
                        <span>{`${Math.ceil(progress * 10000) / 100}`.substring(0, 4)} %</span>
                    </div>
                </div>
            </div>
        </div>
    );
}