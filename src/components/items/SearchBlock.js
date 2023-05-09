import React, { useContext } from 'react';
import Common from '../../Common';
import StateContext from '../../context/StateContext';

export default function SearchBlock({ query, setQuery, setPage }) {
    const { locale } = useContext(StateContext);

    function search(e) {
        e.preventDefault && e.preventDefault();
        let form = Common.convertHTMLFormToFormData(e.target);
        setQuery && setQuery(form.get('q'));
        setPage && setPage(1);
    }

    function clear(e) {
        setQuery && setQuery();
        setPage && setPage(1);
    }

    return (
        <div className="search-wrapper">
            <form className="search" onSubmit={search} >
                <div className="search-main">
                    <input key={query} type="text" minLength="3" maxLength="30" name="q" placeholder={locale.getValue('search.placeholder')} defaultValue={query} required />
                    {query && query.length ? <input type="button" onClick={clear} value={locale.getValue('search.clear')} /> : null}
                    <input type="submit" value={locale.getValue('page.search')} />
                </div>
            </form>
        </div>
    );
}