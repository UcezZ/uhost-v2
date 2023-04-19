import React, { useContext } from 'react';
import Common from '../../Common';
import StateContext from '../../context/StateContext';

export default function SearchBlock({ query, setQuery }) {
    const { locale } = useContext(StateContext);

    function search(e) {
        e.preventDefault && e.preventDefault();
        let form = Common.convertHTMLFormToFormData(e.target);
        setQuery(form.get('q'));
        console.log(e);
    }

    return (
        <div className="search-wrapper">
            <form className="search" onSubmit={search} >
                <div className="search-main">
                    <input key={query} type="text" minLength="3" maxLength="30" name="q" placeholder={locale.getValue('search.placeholder')} defaultValue={query} required />
                    {query && query.length ? <input type="button" onClick={e => setQuery()} value={locale.getValue('search.clear')} /> : null}
                    <input type="submit" value={locale.getValue('page.search')} />
                </div>
            </form>
        </div>
    );
}