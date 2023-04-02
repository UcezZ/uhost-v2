import React, { useContext } from 'react';
import StateContext from '../../context/StateContext';

export default function SearchBlock() {
    const { locale } = useContext(StateContext);

    function search(e) {
        e.preventDefault && e.preventDefault();
        console.log(e);
    }

    return (
        <div className="search-wrapper">
            <form className="search" onSubmit={search} >
                <div className="search-main">
                    <input type="text" minLength="3" maxLength="30" name="q" placeholder={locale.getValue('search.placeholder')} defaultValue="<?= $_GET['q'] ?? '' ?>" required />
                    <input type="submit" value={locale.getValue('page.search')} />
                </div>
            </form>
        </div>
    );
}