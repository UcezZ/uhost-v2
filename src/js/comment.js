window.addEventListener('load', (e) => {
    function sniff(id) {
        let elem = document.getElementById(id);
        elem.attributes.removeNamedItem('id');
        return elem;
    }


    let
        commentWrapper = sniff('comment-wrapper'),
        alias = new URLSearchParams(window.location.search).get('v');

    function setCross() {
        let x = commentWrapper.getElementsByClassName('delete-wrapper');

        if (x.length) {
            for (let i = 0; i < x.length; i++) {
                let
                    id = x[i].id.substring(6);//,
                //comment = sniff('comment' + id);
                x[i].attributes.removeNamedItem('id');
                x[i].addEventListener('click', () => {
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', './api/comment.php');
                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            //comment.outerHTML = '';
                            console.log('deleted comment #%s', id);
                            load();
                        }
                    }
                    xhr.send('m=delete&i=' + id);
                });
            }
        }
    }

    function setSubmit() {
        let t = sniff('comment-input'),
            s = sniff('comment-submit'),
            h = () => {
                if (!t.value.length) {
                    return;
                }
                let xhr = new XMLHttpRequest();
                xhr.open('POST', './api/comment.php');
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        t.value = '';
                        console.log('posted comment');
                        load();
                    }
                }
                xhr.send('m=add&v=' + alias + '&t=' + encodeURIComponent(t.value));
            }
        if (!s || !t) {
            return;
        }

        s.addEventListener('click', h);
        t.addEventListener('keypress', (e) => {
            if (e.key == 'Enter') {
                h();
            }
        });
    }

    function load() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', './api/comment.php?m=all&v=' + alias);
        xhr.onload = (e) => {
            if (e.target.response) {
                commentWrapper.innerHTML = e.target.response;
                setCross();
            }
        };

        xhr.send();
    }

    load();
    setSubmit();
});