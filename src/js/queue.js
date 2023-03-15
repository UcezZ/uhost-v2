window.addEventListener('load', (e) => {
    function sniff(id) {
        let elem = document.getElementById(id);
        elem.attributes.removeNamedItem('id');
        return elem;
    }


    let
        queueWrapper = sniff('queue-wrapper'),
        alias = new URLSearchParams(window.location.search).get('v'),
        plsid = new URLSearchParams(window.location.search).get('p'),
        xhr = new XMLHttpRequest(),
        href = './api/queue.php';
    if (plsid) {
        href += '?p=' + plsid;
    }
    if (alias) {
        href += (plsid ? '&' : '?') + 'v=' + alias;
    }

    xhr.open('GET', href);
    xhr.onload = (e) => {
        if (e.target.response) {
            queueWrapper.innerHTML = e.target.response;
            setCross();
        }
    };

    xhr.send();

});