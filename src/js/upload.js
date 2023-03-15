let
    f = document.getElementById('file'),
    n = document.getElementById('name'),
    e = function () {
        if (n.value.length == 0) {
            n.value = f.value.replace(/^.*[\\\/]/, '');
            n.value = n.value.substr(0, n.value.length - n.value.split('.').pop().length - 1);
            n.value = n.value.substr(0, 64);
        }
    };
f.addEventListener('change', e);
f.attributes.removeNamedItem('id');

n.attributes.removeNamedItem('id');