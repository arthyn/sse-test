const express = require('express')
const SSE = require('express-sse')

const app = express();
const sse = new SSE(['hello!'])
let run = true;

app.use(express.static('public'));
app.get('/stream', sse.init);
app.get('/', function(req, res){
    res.sendFile('index.html');
});

const dataInterval = setInterval(() => {
    if (!run) {
        clearInterval(dataInterval)
        process.exit();
    }

    sse.send(`message ${Date.now()}`)
}, 1000)

app.listen(3333);
console.log('listening at localhost:3333')