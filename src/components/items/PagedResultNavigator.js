import '../../css/navigator.css';

import { useContext } from "react";
import StateContext from "../../context/StateContext";

export default function PagedResultNavigator({ page, setPage, total }) {
    const { locale } = useContext(StateContext);
    return (
        <div className="centerer-wrapper row">
            <div className="navi-wrapper">
                {
                    page > 1 ?
                        (
                            <button onClick={e => setPage(page - 1)}>
                                {locale.getValue('search.prevpage')}
                            </button>
                        ) : null
                }
                {
                    total > 2 && page > 1 && page < total ?
                        (
                            <span className="centerer-wrapper">{page} / {total}</span>
                        ) : null
                }
                {
                    page < total ?
                        (
                            <button onClick={e => setPage(page + 1)}>
                                {locale.getValue('search.nextpage')}
                            </button>
                        ) : null
                }
            </div>
        </div>
    );
}