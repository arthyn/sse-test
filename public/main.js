window.openSSE = function() {
    const connection = new EventSource('/stream');

    connection.onopen = event => {
        log('SSE onopen', event);
    };

    connection.onerror = event => {
        log('SSE onerror', event);
    };

    connection.onmessage = event => {
        log('SSE onmessage', event.data);
    };

    connection.addEventListener('mes', event => {
        log('SSE mes event', event);
    });
};

window.onbeforeunload = () => {
    navigator.serviceWorker.controller.postMessage({
        type: 'CLOSE_STREAM'
    })
}

function log() {
    const message = Array.from(arguments).map(JSON.stringify).join(' ');
    const p = document.createElement('p');

    p.innerText = message;
    document.body.appendChild(p);

    console.log(...arguments);
}

openSSE();