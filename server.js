const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const SITE_FILE = path.join(__dirname, 'lumini_site.html');

const server = http.createServer((req, res) => {
  const requestPath = (req.url || '/').split('?')[0];

  if (requestPath === '/' || requestPath === '/index.html') {
    fs.readFile(SITE_FILE, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Could not load lumini_site.html. Make sure it is in the project folder.');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Lumini is running on port ${PORT}`);
});
