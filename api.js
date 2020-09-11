const express = require('./server/src/app');
const http = require('http');
const port = process.env.PORT || '80';
const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const { parse } = require('url')
express.set('port', port);
const app = next({dev, dir: '../'});
const handle = app.getRequestHandler();
express.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    return handle(req, res, parsedUrl);
});
app.prepare().then(() => {
    const server = http.createServer(express);
    server.listen(port);
});