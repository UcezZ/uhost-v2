import React from 'react';

function SearchBlock() {
    return (
        <div className="search-wrapper">
            <form className="search" method="GET" action="./search.php">
                <div className="search-main">
                    <input type="text" minlength="3" maxlength="30" name="q" placeholder="<?= Locale::getValue('search.placeholder') ?>" value="<?= $_GET['q'] ?? '' ?>" required />
                    <input type="submit" value="<?= Locale::getValue('page.search') ?>" />
                </div>
            </form>
        </div>
    );
}

export default SearchBlock;