const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    if (path.extname(filePath) === '') {
        filePath += '.html';
    }

    let extName = path.extname(filePath);

    let contentType;

    switch (extName) {
        case '.json':
            contentType = 'application/json';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        default:
            contentType = 'text/html';
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, '/public', '404.html'), (err, data) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                })
            }
            else {
                res.writeHead(500);
                res.end(`Server Error : ${err.code}`);
            }
        }
        else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    })
});

const PORT = process.env.PORT || 3500;

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});