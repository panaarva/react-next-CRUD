const express = require('./server/src/app');
const http = require('http');
const port = process.env.PORT || '9000';
const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const { parse } = require('url')
express.set('port', port);
const app = next({dev, dir: '../'});
const handle = app.getRequestHandler();
express.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    if (pathname === '/employee') {
        return app.render(req, res, '/employee', query)
    } else if (pathname === '/') {
        return app.render(req, res, '/', query)
    } else {
        return handle(req, res, parsedUrl)
    }
});
app.prepare().then(() => {
    const server = http.createServer(express);
    console.log(port)
    server.listen(port);
});